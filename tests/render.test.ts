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

  it('carries no "interactive example" labels or helper text under the phones', () => {
    expect(body).not.toContain('showcase-badge');
    expect(body).not.toContain('<figcaption');
    expect(body).not.toMatch(/data-caption=/);
    expect(body).not.toMatch(/مثال تفاعلي|نموذج تفاعلي|Interactive (example|illustration)/);
    expect(body).not.toMatch(/يعتمده|بحث وتطوير|R&amp;D/);
  });

  it('keeps the user-guide phone in the page language', () => {
    const start = body.indexOf('<figure class="showcase" data-showcase');
    const phone = body.slice(start, body.indexOf('</figure>', start));
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    expect(phone).toContain(`class="device-screen" dir="${dir}" lang="${locale}"`);
    const text = phone.replace(/<[^>]+>/g, ' ');
    expect(locale === 'ar' ? /[A-Za-z]{3,}/.test(text) : /\p{Script=Arabic}/u.test(text)).toBe(false);
  });

  it('drops the location from the hero', () => {
    expect(body).not.toMatch(/Riyadh|الرياض/);
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
    const roles = locale === 'ar' ? ['مهندس دعم تقني', 'أخصائي دعم تطبيقات'] : ['Technical Support Engineer', 'Application Support Engineer'];
    expect(body).toContain(`hero-role-main">${roles[0]}<`);
    expect(body).toContain(`hero-role-alt">${roles[1]}<`);
  });

  it('renders the descriptive hero sentence', () => {
    const line =
      locale === 'ar'
        ? 'أدعم التطبيقات وأتابع مشاكل التشغيل حتى تُحل، وأبني الأدوات والأدلة التي تسهّل العمل على الفريق.'
        : 'I keep applications running, follow operational problems through to a fix, and build the tools and guides that make the next one easier.';
    expect(body).toContain(`<p class="hero-line">${line}</p>`);
  });

  it('only wires phone controls to screens and exchanges that exist', () => {
    const screens = all(body, /data-screen="([^"]+)"/g);
    for (const target of all(body, /data-go="([^"]+)"/g)) expect(screens).toContain(target);
    const exchanges = all(body, /data-exchange="(\d+)"/g);
    for (const index of all(body, /data-ask="(\d+)"/g)) expect(exchanges).toContain(index);
  });

  it('keeps the consultation phone in the product language, Arabic', () => {
    expect(body).toContain('data-consult');
    expect(body).toMatch(/class="device-screen c-screen" dir="rtl" lang="ar"/);
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
