import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, devices, webkit, type Browser, type BrowserContext, type BrowserType, type Page } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { startPagesServer, type PagesServer } from './pages-server.ts';

// These tests drive real browsers against the built site in dist/, served the
// way GitHub Pages serves it. They exist because the production failure, a
// page losing its styles after a deploy, only appears across navigations,
// caches and releases, which static checks cannot see.
//
// Run `npm run build` first, and `npx playwright install chromium webkit` once.

const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));
const LEGACY_SITE = fileURLToPath(new URL('./fixtures/legacy-site/', import.meta.url));

type ContextOptions = NonNullable<Parameters<Browser['newContext']>[0]>;

const ENGINES: Array<[string, BrowserType, ContextOptions]> = [
  ['WebKit (iPhone, 375px)', webkit, { ...devices['iPhone 12 Mini'] }],
  ['Chromium (phone, 375px)', chromium, { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true }],
  ['Chromium (desktop)', chromium, { viewport: { width: 1280, height: 800 } }],
];

/** Styled means the stylesheet applied: design tokens exist and nothing looks like a default page. */
async function expectStyled(page: Page): Promise<void> {
  const state = await page.evaluate(() => {
    const portrait = document.querySelector<HTMLElement>('.portrait');
    const link = document.querySelector<HTMLElement>('nav a:not([aria-current])');
    return {
      tokens: getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() !== '',
      portraitWidth: portrait ? Math.round(portrait.getBoundingClientRect().width) : null,
      linkDecoration: link ? getComputedStyle(link).textDecorationLine : null,
    };
  });
  expect(state.tokens).toBe(true);
  expect(state.portraitWidth).toBeLessThanOrEqual(100);
  expect(state.linkDecoration).toBe('none');
}

/** Ready means styled, in the expected language, and with the script running. */
async function expectReady(page: Page, lang: 'ar' | 'en'): Promise<void> {
  expect(await page.getAttribute('html', 'lang')).toBe(lang);
  await expectStyled(page);
  await page.waitForFunction(() => document.querySelector('[data-video-open]')?.getAttribute('role') === 'button');
}

const cacheNames = (page: Page) => page.evaluate(() => caches.keys());
const registrationCount = (page: Page) => page.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).length);

describe.each(ENGINES)('%s', (_name, type, contextOptions) => {
  let browser: Browser;
  let server: PagesServer;
  let context: BrowserContext;
  let page: Page;
  let emptyRelease: string;
  const failedAssets: string[] = [];
  const pageErrors: string[] = [];

  beforeAll(async () => {
    if (!existsSync(DIST)) throw new Error('dist/ not found. Run `npm run build` first.');
    emptyRelease = mkdtempSync(join(tmpdir(), 'portfolio-empty-'));
    browser = await type.launch();
  });

  afterAll(async () => {
    await browser.close();
    rmSync(emptyRelease, { recursive: true, force: true });
  });

  const open = async (release: string) => {
    server = await startPagesServer(release);
    context = await browser.newContext(contextOptions);
    page = await context.newPage();
    failedAssets.length = 0;
    pageErrors.length = 0;
    page.on('response', (response) => {
      if (response.url().startsWith(server.url.slice(0, server.url.indexOf('/', 8))) && response.status() >= 400) failedAssets.push(response.url());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
  };
  const close = async () => {
    await context.close();
    await server.close();
  };

  describe('fresh visitor', () => {
    beforeAll(() => open(DIST));
    afterAll(close);

    it('stays styled and interactive across repeated language switches and refreshes', async () => {
      await page.goto(server.url);
      for (let round = 0; round < 3; round++) {
        await expectReady(page, 'ar');
        await page.click('a[hreflang="en"]');
        await page.waitForURL(`${server.url}en/`);
        await expectReady(page, 'en');
        await page.reload();
        await expectReady(page, 'en');
        await page.click('a[hreflang="ar"]');
        await page.waitForURL(server.url);
        await expectReady(page, 'ar');
        await page.reload();
      }
      await expectReady(page, 'ar');
    });

    it('survives back and forward navigation between the languages', async () => {
      await page.goto(server.url);
      await page.click('a[hreflang="en"]');
      await page.waitForURL(`${server.url}en/`);
      await page.goBack();
      await expectReady(page, 'ar');
      await page.goForward();
      await expectReady(page, 'en');
    });

    it('loads direct and fragment URLs', async () => {
      for (const [path, lang] of [['', 'ar'], ['#guide', 'ar'], ['#advisor', 'ar'], ['en/', 'en'], ['en/#guide', 'en'], ['en/#advisor', 'en']] as const) {
        await page.goto(server.url + path);
        await expectReady(page, lang);
        await page.reload();
        await expectReady(page, lang);
      }
    });

    it('redirects a directory URL without its trailing slash', async () => {
      await page.goto(`${server.url}en`);
      await page.waitForURL(`${server.url}en/`);
      await expectReady(page, 'en');
    });

    it('forwards the site\'s earlier pages to their new sections', async () => {
      await page.goto(`${server.url}research.html`);
      await page.waitForURL(`${server.url}#advisor`);
      await expectReady(page, 'ar');
      await page.goto(`${server.url}operations-knowledge-center.html`);
      await page.waitForURL(`${server.url}#guide`);
      await expectReady(page, 'ar');
    });

    it('requests only files that exist, and runs without script errors', () => {
      expect(failedAssets).toEqual([]);
      expect(pageErrors).toEqual([]);
    });
  });

  describe('a page served after its release was replaced', () => {
    beforeAll(async () => {
      await open(DIST);
      // The pages come from one release while every other file is gone, as
      // when a cache still holds the previous deploy's HTML.
      server.releases.files = emptyRelease;
    });
    afterAll(close);

    it('keeps its styles and behavior, because it needs no other file', async () => {
      await page.goto(server.url);
      await expectReady(page, 'ar');
      await page.click('a[hreflang="en"]');
      await page.waitForURL(`${server.url}en/`);
      await expectReady(page, 'en');
      await page.click('a[hreflang="ar"]');
      await page.waitForURL(server.url);
      await expectReady(page, 'ar');
      expect(server.notFound.filter((path) => /\.(css|js)$/.test(path))).toEqual([]);
    });
  });

  describe('returning visitor with the legacy offline worker', () => {
    beforeAll(() => open(LEGACY_SITE));
    afterAll(close);

    const installLegacySite = async () => {
      await page.goto(server.url);
      if (!(await page.evaluate(() => 'serviceWorker' in navigator))) return false;
      await page.evaluate(() => navigator.serviceWorker.ready);
      await page.waitForFunction(async () => (await caches.keys()).includes('aa-portfolio-v42'));
      // A cache owned by another GitHub Pages project on the same origin.
      await page.evaluate(async () => (await caches.open('other-project-v1')).put('/x', new Response('x')));
      return true;
    };

    it('replaces the stale cached page and retires the old worker on the next update check', async (ctx) => {
      if (!(await installLegacySite())) return ctx.skip();
      server.releases.pages = DIST;
      server.releases.files = DIST;

      // The old worker still answers from its cache, so the visitor sees the old page.
      await page.reload();
      expect(await page.locator('#legacy-marker').count()).toBe(1);

      // The browser's own update check finds the retirement worker.
      await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())?.update());
      await page.waitForSelector('#hero-name', { timeout: 20_000 });
      await expectReady(page, 'ar');
      await page.waitForFunction(async () => (await navigator.serviceWorker.getRegistrations()).length === 0);
      expect(await cacheNames(page)).toEqual(['other-project-v1']);
    });
  });

  describe('legacy visitor opening a current page that reaches the network', () => {
    beforeAll(() => open(LEGACY_SITE));
    afterAll(close);

    it('removes only this site\'s worker and caches', async (ctx) => {
      await page.goto(server.url);
      if (!(await page.evaluate(() => 'serviceWorker' in navigator))) return ctx.skip();
      await page.evaluate(() => navigator.serviceWorker.ready);
      await page.waitForFunction(async () => (await caches.keys()).includes('aa-portfolio-v42'));
      await page.evaluate(async () => (await caches.open('other-project-v1')).put('/x', new Response('x')));
      server.releases.pages = DIST;
      server.releases.files = DIST;

      // The English URL is not in the old worker's cache, so it comes from the network.
      await page.goto(`${server.url}en/`);
      await expectReady(page, 'en');
      await page.waitForFunction(async () => (await navigator.serviceWorker.getRegistrations()).length === 0);
      expect(await registrationCount(page)).toBe(0);
      expect(await cacheNames(page)).toEqual(['other-project-v1']);
    });
  });
});
