import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { LOCALES } from '../src/content/types.ts';
import { renderBody, renderHead } from '../src/render/page.ts';

/**
 * Confidentiality guard. The user-guide client and the private product's
 * internal codenames must never reach a public page. Listing those names in
 * a public test would leak them, so only their SHA-256 digests are stored;
 * every word on the rendered pages is hashed and compared.
 */
const FORBIDDEN = new Set([
  '54bbe6c27c54ad2d07fc3cd10461aa18f8920c220d5e134dfe35c437e8fb9d2e',
  'a104a6fcf0d5382281cb736e6f20f1da460236e3608c4366ffc83f584f7d689c',
  '091b89507565efd8611bee0e3327bc9563d7fe2e0de35a57682b9367bc4cecee',
  'f58e623459e4a69acfdae2f5601d11e734135dcfd27b823bd14926cb3450b5fb',
  '8fdcd86698a147bc647c836b3e0a655df2574d685ecae300e7e629741136df86',
  '203c72d5275e0f19e70e2a6f31aee240fb7c8491a0f82bcf99d7866467a150ff',
  '65f548952005825d6a788fd0771e6bfa3cdaf63dacf42672a66d32a29b6a7da2',
  'd5089549ea67f6fd120843d7559c4beb65da6c785512dc7ba8e3b497bcd43e67',
  '2b44752aa7521610737b7ee73fe94c640d5d6d027b1b6496db722caa74a97bd4',
  '385b1c7f27719533ffa6fbc7d6f1740d7fb9b4260d7fbdaf747b966ddba6c7c8',
]);

const sha256 = (word: string) => createHash('sha256').update(word).digest('hex');
const words = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .toLocaleLowerCase()
    .match(/[\p{L}\p{M}\p{N}-]+/gu) ?? [];

describe.each(LOCALES)('%s page confidentiality', (locale) => {
  it('contains none of the forbidden names', () => {
    const leaked = words(renderHead(locale) + renderBody(locale)).filter((w) => FORBIDDEN.has(sha256(w)));
    expect(leaked).toEqual([]);
  });

  it('never prints an email address', () => {
    expect(renderBody(locale)).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
  });
});
