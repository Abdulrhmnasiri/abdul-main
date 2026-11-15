import { initConsult } from './consult.ts';
import { initContactForm } from './contact-form.ts';
import { initDisclosures } from './disclosure.ts';
import { initGate } from './gate.ts';
import { retireLegacyWorker } from './legacy-worker.ts';
import { initLanguageSwitch, initSectionHighlight } from './nav.ts';
import { initShowcase } from './showcase.ts';
import { initWalkthrough } from './walkthrough.ts';

// The page is fully rendered at build time; this script only adds behavior,
// so any failure here leaves readable, navigable content behind. Each
// initializer runs on its own, so one failing does not disable the rest.
const run = (name: string, init: () => void) => {
  try {
    init();
  } catch (error) {
    console.error(`${name} failed to initialize`, error);
  }
};
const each = (selector: string, init: (el: HTMLElement) => void) =>
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => run(selector, () => init(el)));

each('[data-showcase]', initShowcase);
each('[data-showcase]', initWalkthrough);
each('[data-consult]', initConsult);
each('[data-gate]', initGate);
run('disclosures', initDisclosures);
run('contact form', () => initContactForm(document));
run('section highlight', initSectionHighlight);
run('language switch', initLanguageSwitch);

// The English page lives one level below the site root.
void retireLegacyWorker(new URL(document.documentElement.lang === 'en' ? '../' : './', location.href));
