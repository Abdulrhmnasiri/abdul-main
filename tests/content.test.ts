import { describe, expect, it } from 'vitest';
import { statusRows } from '../src/content/status.ts';
import { strings } from '../src/content/strings.ts';
import { advisor, guide } from '../src/content/work.ts';
import { splitOnKeyword } from '../src/render/guide.ts';

/** Collects every { ar, en } pair in a value, with a path for readable failures. */
function localizedPairs(value: unknown, path = '$'): Array<[string, unknown, unknown]> {
  if (!value || typeof value !== 'object') return [];
  const record = value as Record<string, unknown>;
  if ('ar' in record && 'en' in record) return [[path, record.ar, record.en]];
  return Object.entries(record).flatMap(([key, child]) => localizedPairs(child, `${path}.${key}`));
}

describe('bilingual content', () => {
  it.each(localizedPairs({ guide, advisor, statusRows }))('%s is filled in both languages', (_path, ar, en) => {
    expect(String(ar).trim()).not.toBe('');
    expect(String(en).trim()).not.toBe('');
  });

  // An Arabic phrase that opens with a Latin word renders out of order in an
  // RTL line. Purely Latin terms (e.g. "Clean Architecture") are fine.
  it.each(localizedPairs({ guide, advisor, statusRows }))('%s opens with Arabic when it mixes scripts', (_path, ar) => {
    const text = String(ar);
    if (/\p{Script=Arabic}/u.test(text)) expect(text.trim()).toMatch(/^[^A-Za-z]/);
  });

  it('keeps Arabic section titles free of decorative English', () => {
    for (const title of [strings.ar.guide.title, strings.ar.advisor.title, strings.ar.contact.title]) {
      expect(title).not.toMatch(/[A-Za-z]/);
    }
  });
});

describe('user guide', () => {
  it('routes each documented example through a keyword in its phrase', () => {
    for (const r of guide.routes) {
      for (const l of ['ar', 'en'] as const) expect(splitOnKeyword(r.phrase[l], r.keyword[l])[1]).toBe(r.keyword[l]);
    }
  });

  it('has a unique id for every screen', () => {
    expect(new Set(guide.screens.map((s) => s.id)).size).toBe(guide.screens.length);
  });
});

describe.each([
  ['user guide', guide.evidence],
  ['career advisor', advisor.evidence],
] as const)('%s evidence', (_name, evidence) => {
  it('lists decisions, technologies and skills without duplicates', () => {
    expect(evidence.decisions.length).toBeGreaterThan(0);
    expect(new Set(evidence.technologies).size).toBe(evidence.technologies.length);
    expect(evidence.skills.length).toBeGreaterThan(0);
  });
});

describe('career advisor', () => {
  it('shows one passing example and at least one stop at each check', () => {
    const stops = advisor.gate.map((g) => g.stop);
    expect(stops).toContain('stored');
    expect(stops).toContain('source');
    expect(stops).toContain('claim');
  });

  it('keeps what is implemented apart from what is still in development', () => {
    expect(advisor.status.some((s) => s.state === 'done')).toBe(true);
    expect(advisor.status.some((s) => s.state === 'building')).toBe(true);
  });

  it('only links the demo slot to an https URL', () => {
    if (advisor.demoUrl) expect(advisor.demoUrl).toMatch(/^https:\/\//);
  });
});

describe('recorded consultation', () => {
  const { consult } = advisor;

  it('keeps the recorded lines in the product language, Arabic', () => {
    for (const line of [consult.candidate, consult.read, consult.wording, consult.question]) {
      expect(line).toMatch(/\p{Script=Arabic}/u);
    }
  });

  it('never states a result the candidate did not confirm', () => {
    // The proposed wording must not invent a figure; the question may ask for one.
    expect(consult.wording).not.toMatch(/\d+\s*%|\d{2,}/);
  });
});

describe('project index', () => {
  it('lists projects only, each linking to its section', () => {
    expect(statusRows.map((r) => r.href)).toEqual(['#guide', '#advisor']);
  });
});
