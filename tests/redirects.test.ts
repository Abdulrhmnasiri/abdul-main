import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LOCALES } from '../src/content/types.ts';
import { renderBody } from '../src/render/page.ts';

// Pages from earlier versions of the site. GitHub Pages cannot send HTTP
// redirects, so each one is a static page that forwards to its new section.
const LEGACY = [
  { file: 'public/research.html', section: 'advisor' },
  { file: 'public/operations-knowledge-center.html', section: 'guide' },
];

describe.each(LEGACY)('legacy page $file', ({ file, section }) => {
  const html = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

  it('forwards to the matching section, with and without a script', () => {
    expect(html).toContain(`http-equiv="refresh" content="0; url=./#${section}"`);
    expect(html).toContain(`location.replace('./en/#${section}')`);
  });

  it('points search engines at the new canonical URL', () => {
    expect(html).toContain(`rel="canonical" href="https://abdulrhmnasiri.github.io/abdul-main/#${section}"`);
  });

  it.each(LOCALES)('targets a section that exists on the %s page', (locale) => {
    expect(renderBody(locale)).toContain(`id="${section}"`);
  });
});
