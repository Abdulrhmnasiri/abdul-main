import { describe, expect, it } from 'vitest';
import { validate } from '../src/client/contact-form.ts';
import { gateStates } from '../src/lib/gate.ts';
import { escapeHtml, html, raw } from '../src/lib/html.ts';

describe('html', () => {
  it('escapes interpolated strings', () => {
    expect(html`<p>${'<img src=x onerror="alert(1)">'}</p>`.value).toBe(
      '<p>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</p>',
    );
  });

  it('does not double-escape nested templates or raw markup', () => {
    const inner = html`<b>${'a & b'}</b>`;
    expect(html`<p>${inner}${raw('<i>x</i>')}</p>`.value).toBe('<p><b>a &amp; b</b><i>x</i></p>');
  });

  it('joins arrays and drops null, undefined and false', () => {
    expect(html`${['a', 'b']}${null}${undefined}${false}${0}`.value).toBe('ab0');
  });

  it('escapes single quotes for attribute safety', () => {
    expect(escapeHtml(`it's`)).toBe('it&#39;s');
  });
});

describe('gateStates', () => {
  it('passes every node for a stored fact', () => {
    expect(gateStates('stored')).toEqual({ confirm: 'pass', source: 'pass', claim: 'pass', stored: 'pass' });
  });

  it('blocks at the source check and never reaches later nodes', () => {
    expect(gateStates('source')).toEqual({ confirm: 'pass', source: 'block', claim: 'skip', stored: 'skip' });
  });

  it('blocks at the claim check after passing the source check', () => {
    expect(gateStates('claim')).toEqual({ confirm: 'pass', source: 'pass', claim: 'block', stored: 'skip' });
  });
});

describe('contact form validation', () => {
  const valid = { name: 'Sara', email: 'sara@example.com', message: 'Hello', website: '' };

  it('accepts a complete message', () => {
    expect(validate(valid)).toBe('ok');
  });

  it('flags a filled honeypot as a bot before anything else', () => {
    expect(validate({ ...valid, name: '', website: 'spam.example' })).toBe('bot');
  });

  it.each([
    ['empty name', { name: '  ' }],
    ['empty message', { message: '' }],
    ['malformed email', { email: 'sara@' }],
  ])('rejects %s', (_label, patch) => {
    expect(validate({ ...valid, ...patch })).toBe('required');
  });
});
