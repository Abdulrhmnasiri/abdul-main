import { describe, expect, it } from 'vitest';
import { LOCALES } from '../src/content/types.ts';
import { advisor } from '../src/content/work.ts';
import { renderBody, renderHead } from '../src/render/page.ts';

const NOW = new Date(Date.UTC(2026, 10, 1));
const all = (source: string, pattern: RegExp) => [...source.matchAll(pattern)].map((m) => m[1]!);

describe.each(LOCALES)('rendered %s page', (locale) => {
  const body = renderBody(locale, NOW);
  const head = renderHead(locale);
  const ids = all(body, /\sid="([^"]+)"/g);

  it('has unique element ids', () => {
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('resolves every in-page link and aria reference', () => {
    const refs = [...all(body, /href="#([^"]+)"/g), ...all(body, /aria-(?:controls|labelledby)="([^"]+)"/g)];
    for (const target of refs) expect(ids).toContain(target);
  });

  it('has a single h1', () => {
    expect(body.match(/<h1[\s>]/g)?.length).toBe(1);
  });

  it('gives every image an alt attribute', () => {
    for (const img of body.match(/<img\b[^>]*>/g) ?? []) expect(img).toMatch(/\salt="[^"]*"/);
  });

  it('opens external links safely', () => {
    for (const link of body.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []) expect(link).toContain('noopener');
  });

  it('labels the user-guide screens as illustrations', () => {
    expect(body).toMatch(/class="showcase-badge">[^<]+</);
  });


  it('shows a Live Demo link only when a real demo URL is configured', () => {
    if (advisor.demoUrl) expect(body).toContain(`href="${advisor.demoUrl}"`);
    else expect(body).not.toMatch(/Live Demo/);
  });

  it('renders every disclosure row collapsed', () => {
    expect(body).not.toMatch(/<details[^>]*\sopen[\s>=]/);
    expect(body.match(/<details class="row"/g)?.length).toBe(7);
  });

  it('labels the evidence rows as specified', () => {
    const labels =
      locale === 'ar'
        ? ['القرارات التقنية', 'التقنيات المستخدمة', 'المهارات الهندسية']
        : ['Technical Decisions', 'Technologies Used', 'Applied Engineering Skills'];
    for (const label of labels) expect(body.match(new RegExp(`<summary>${label}</summary>`, 'g'))?.length).toBe(2);
  });

  it('puts the primary title before the secondary one in the hero', () => {
    const main = body.indexOf('hero-role-main');
    const alt = body.indexOf('hero-role-alt');
    expect(main).toBeGreaterThan(-1);
    expect(alt).toBeGreaterThan(main);
    const roles = locale === 'ar' ? ['مهندس دعم تقني', 'مهندس دعم تطبيقات'] : ['Technical Support Engineer', 'Application Support Engineer'];
    expect(body).toContain(`hero-role-main">${roles[0]}<`);
    expect(body).toContain(`hero-role-alt">${roles[1]}<`);
  });

  it('keeps the descriptive hero sentence unchanged', () => {
    const line =
      locale === 'ar'
        ? 'أدعم التطبيقات وأحل مشكلات التشغيل، وأطوّر الأدوات والأنظمة التي تجعلها أسهل استخدامًا وأكثر موثوقية.'
        : 'I support applications and resolve operational issues, and I build the tools and systems that make them easier to use and more reliable.';
    expect(body).toContain(`<p class="hero-line">${line}</p>`);
  });

  it('only wires phone controls to screens and exchanges that exist', () => {
    const screens = all(body, /data-screen="([^"]+)"/g);
    for (const target of all(body, /data-go="([^"]+)"/g)) expect(screens).toContain(target);
    const exchanges = all(body, /data-exchange="(\d+)"/g);
    for (const index of all(body, /data-ask="(\d+)"/g)) expect(exchanges).toContain(index);
  });

  it('has exactly one caption per phone screen and consultation stage', () => {
    const captions = all(body, /data-caption="([^"]+)"/g);
    expect(captions.length).toBe(new Set(captions).size);
    expect(captions).toEqual(expect.arrayContaining(['procedure', 'assistant', 'support', 'permissions', 'understand', 'saved', 'rejected']));
  });

  it('marks the consultation phone as an interactive example from a recorded run', () => {
    expect(body).toMatch(/class="showcase-badge">[^<]+</);
    expect(body).toContain('data-consult');
  });

  it('keeps the recreated device right-to-left in both languages', () => {
    expect(body).toMatch(/class="device-screen" dir="rtl" lang="ar"/);
  });

  it('pre-renders the first gate example so it reads without JavaScript', () => {
    expect(body).toMatch(/data-node="stored" data-state="pass"/);
  });

  it('describes the page in the head', () => {
    expect(head).toMatch(/<title>[^<]+<\/title>/);
    expect(head).toMatch(/name="description" content="[^"]+"/);
  });
});

describe('language switch', () => {
  it('links each page to the other', () => {
    expect(renderBody('ar', NOW)).toMatch(/href="en\/" hreflang="en"/);
    expect(renderBody('en', NOW)).toMatch(/href="\.\.\/" hreflang="ar"/);
  });
});
