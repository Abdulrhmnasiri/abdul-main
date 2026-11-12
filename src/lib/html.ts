/**
 * Minimal HTML templating for build-time rendering.
 *
 * Every interpolated value is escaped unless it is itself the result of
 * `html` (or explicitly wrapped with `raw`), so content can never inject
 * markup by accident. Arrays are joined, and null/undefined/false render as
 * nothing to keep conditional sections readable.
 */
export class SafeHtml {
  constructor(readonly value: string) {}
  toString(): string {
    return this.value;
  }
}

type Interpolation = SafeHtml | string | number | boolean | null | undefined | Interpolation[];

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char);
}

function render(value: Interpolation): string {
  if (value === null || value === undefined || value === false) return '';
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(render).join('');
  return escapeHtml(String(value));
}

export function html(strings: TemplateStringsArray, ...values: Interpolation[]): SafeHtml {
  let out = strings[0] ?? '';
  values.forEach((value, i) => {
    out += render(value) + (strings[i + 1] ?? '');
  });
  return new SafeHtml(out);
}

/** Marks trusted, already-escaped markup (e.g. inline SVG icons). */
export function raw(markup: string): SafeHtml {
  return new SafeHtml(markup);
}
