import type { Locale } from '../content/types.ts';
import { strings, type UiStrings } from '../content/strings.ts';

export interface RenderContext {
  locale: Locale;
  t: UiStrings;
  /** Relative path from the current page back to the site root ('' or '../'). */
  root: string;
  /** Relative URL of the same page in the other language. */
  alternateHref: string;
  alternateLocale: Locale;
  /** Build time; supplies the footer year. */
  now: Date;
}

/**
 * Arabic is served at the site root and English under /en/. All URLs are
 * relative so the build works unchanged on a custom domain or a GitHub
 * Pages project path.
 */
export function createContext(locale: Locale, now = new Date()): RenderContext {
  const isArabic = locale === 'ar';
  return {
    locale,
    t: strings[locale],
    root: isArabic ? '' : '../',
    alternateHref: isArabic ? 'en/' : '../',
    alternateLocale: isArabic ? 'en' : 'ar',
    now,
  };
}
