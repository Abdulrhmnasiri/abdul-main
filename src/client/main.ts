import { initConsult } from './consult.ts';
import { initContactForm } from './contact-form.ts';
import { initDisclosures } from './disclosure.ts';
import { initGate } from './gate.ts';
import { initLanguageSwitch, initSectionHighlight } from './nav.ts';
import { initShowcase } from './showcase.ts';

// The page is fully rendered at build time; this script only adds behavior,
// so any failure here leaves readable, navigable content behind.
const each = (selector: string, init: (el: HTMLElement) => void) =>
  document.querySelectorAll<HTMLElement>(selector).forEach(init);

each('[data-showcase]', initShowcase);
each('[data-consult]', initConsult);
each('[data-gate]', initGate);
initDisclosures();
initContactForm(document);
initSectionHighlight();
initLanguageSwitch();
