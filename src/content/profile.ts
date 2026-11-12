import type { Localized } from './types.ts';

export const profile = {
  name: {
    ar: 'عبدالرحمن عسيري',
    en: 'Abdulrahman Asiri',
  },
  role: {
    ar: 'مهندس دعم تقني',
    en: 'Technical Support Engineer',
  },
  links: {
    github: 'https://github.com/Abdulrhmnasiri',
    linkedin: 'https://www.linkedin.com/in/abdulrahman-asiri-1a579320a/',
  },
  sourceRepo: 'https://github.com/Abdulrhmnasiri/abdul-main',
  cv: 'cv.pdf',
  /**
   * Web3Forms delivers the contact form without a backend. The access key is
   * designed for frontend use; the recipient address never appears on the page.
   */
  contactForm: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '9ddad33b-4851-4359-b037-1543ec16f62e',
    script: 'https://web3forms.com/client/script.js',
  },
  /**
   * Absolute URL of the deployed site root, without a trailing slash.
   * Canonical, hreflang and Open Graph URLs must be absolute, so they are
   * only emitted when this is set.
   */
  siteUrl: 'https://abdulrhmnasiri.github.io/abdul-main',
} as const satisfies {
  name: Localized;
  role: Localized;
  contactForm: { endpoint: string; accessKey: string; script: string };
  links: Record<string, string>;
  sourceRepo: string;
  cv: string;
  siteUrl: string;
};
