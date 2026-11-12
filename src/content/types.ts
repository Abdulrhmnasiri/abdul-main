export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** A value that must exist in every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

/** A project listed in the hero index. */
export interface StatusRow {
  id: string;
  label: Localized;
  value: Localized;
  state: 'live' | 'building' | 'info';
  href?: string;
}

/** One screen of the user-guide recreation, with what it demonstrates. */
export interface GuideScreen {
  id: 'procedure' | 'assistant' | 'support' | 'permissions';
  /** Present only for screens that sit in the app's bottom bar. */
  tab?: Localized;
  caption: Localized;
}

/** Where a statement leaves the advisor's fact pipeline. */
export type GateStop = 'stored' | 'source' | 'claim';

export interface GateExample {
  id: string;
  statement: Localized;
  origin: Localized;
  stop: GateStop;
}

export interface ProgressItem {
  label: Localized;
  note?: Localized;
  /** `building`: work in development, shown apart from what is implemented. */
  state: 'done' | 'building';
}

/** An engineering choice and the reason for it. */
export interface Decision {
  title: Localized;
  body: Localized;
}

/** What a project used and practiced, each item backed by its repository. */
export interface Evidence {
  decisions: Decision[];
  technologies: string[];
  skills: Localized[];
}
