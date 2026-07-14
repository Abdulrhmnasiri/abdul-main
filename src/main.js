import { appState } from './modules/state.js';
import { setSavedLang } from './utils/lang.js';
import { applySiteNavTranslations, initSiteNav } from './modules/site-nav.js';
import { applyTranslations } from './modules/i18n.js';
import { initContactForm } from './modules/contact-form.js';
import { registerServiceWorker } from './modules/pwa.js';
import { setCurrentYear, initScrollAnimations } from './utils/dom.js';

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  setTimeout(() => {
    if (!document.querySelector('.reveal.visible')) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      document.documentElement.classList.remove('js');
    }
  }, 900);

  try {
    setCurrentYear();
    initSiteNav();
    applySiteNavTranslations(appState.lang);
    applyTranslations();
    initContactForm();
    registerServiceWorker();

    document.getElementById('langToggle')?.addEventListener('click', () => {
      appState.lang = appState.lang === 'ar' ? 'en' : 'ar';
      setSavedLang(appState.lang);
      applySiteNavTranslations(appState.lang);
      applyTranslations();
    });

    initScrollAnimations();

  } catch (err) {
    console.error('Init failed:', err);
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    document.documentElement.classList.remove('js');
  }
});
