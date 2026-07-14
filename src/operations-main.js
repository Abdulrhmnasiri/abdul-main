import { getSavedLang, setSavedLang } from './utils/lang.js';
import { applyOperationsTranslations } from './modules/operations-i18n.js';
import { setCurrentYear, initScrollAnimations } from './utils/dom.js';
import { registerServiceWorker } from './modules/pwa.js';

let currentLang = getSavedLang();

function initMobileFileStrip() {
  const toggle = document.getElementById('opsMobileFilesToggle');
  const strip = document.getElementById('opsMobileFilesStrip');
  if (!toggle || !strip) return;

  toggle.addEventListener('click', () => {
    const isOpen = strip.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  strip.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      strip.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function initActiveFileTracking() {
  const sections = Array.from(document.querySelectorAll('.dossier-main .dossier-section[id^="ops-sec-"]'));
  const links = () => Array.from(document.querySelectorAll('.filetree-link'));

  function markActive(id) {
    links().forEach(a => {
      const isActive = a.getAttribute('data-target') === id;
      a.classList.toggle('is-active-file', isActive);
      if (isActive) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  if (typeof IntersectionObserver === 'undefined' || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    if (visible.length) {
      const topMost = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      markActive(topMost.target.id);
    }
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  try {
    setCurrentYear();
    applyOperationsTranslations(currentLang);
    registerServiceWorker();
    initScrollAnimations();
    initMobileFileStrip();
    initActiveFileTracking();

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
