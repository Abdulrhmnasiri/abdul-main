import { getSavedLang, setSavedLang } from './utils/lang.js';
import { applyOperationsTranslations } from './modules/operations-i18n.js';
import { setCurrentYear, initScrollAnimations } from './utils/dom.js';
import { registerServiceWorker } from './modules/pwa.js';

let currentLang = getSavedLang();

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  try {
    setCurrentYear();
    applyOperationsTranslations(currentLang);
    registerServiceWorker();
    initScrollAnimations();

    document.getElementById('langToggle')?.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      setSavedLang(currentLang);
      applyOperationsTranslations(currentLang);
    });
  } catch (err) {
    console.error('Operations page init failed:', err);
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    document.documentElement.classList.remove('js');
  }, 900);
});
