import type { StatusRow } from './types.ts';

// The hero index lists projects only, each with what it demonstrates and its
// real state. "Production" stays in English on both pages, as the industry term.
export const statusRows: StatusRow[] = [
  {
    id: 'guide',
    label: { ar: 'دليل المستخدم', en: 'User Guide' },
    value: { ar: 'هندسة التوثيق · Production', en: 'Documentation engineering · Production' },
    state: 'live',
    href: '#guide',
  },
  {
    id: 'advisor',
    label: { ar: 'مستشار مهني', en: 'Career Advisor' },
    value: { ar: 'Development', en: 'Development' },
    state: 'building',
    href: '#advisor',
  },
];
