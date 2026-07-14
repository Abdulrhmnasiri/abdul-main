import { siteI18n } from '../data/site-translations.js';

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined) el.textContent = value;
}

export function applySiteNavTranslations(lang) {
  const t = siteI18n[lang];
  setText('navHome', t.nav_home);
  setText('navMethod', t.nav_method);
  setText('navTechnical', t.nav_technical);
  setText('navContact', t.nav_contact);
  setText('footerText', t.footer);

  const menuBtn = document.getElementById('navMenuToggle');
  if (menuBtn) {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-label', isOpen ? t.nav_menu_close : t.nav_menu_open);
  }

  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
}

function markActiveLink() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-links a[data-page]').forEach(a => {
    const isActive = a.getAttribute('data-page') === path;
    a.classList.toggle('is-active-page', isActive);
    if (isActive) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

const MOBILE_MEDIA_QUERY = '(max-width: 760px)';

// Sections without their own nav entry (e.g. Professional Roots) inherit the
// nearest preceding item's active state, since the nav has no dedicated link for them.
const SECTION_TO_NAV_ID = {
  profile: 'navHome',
  method: 'navMethod',
  practice: 'navMethod',
  technical: 'navTechnical',
  contact: 'navContact',
};

function initActiveSectionTracking() {
  if (typeof IntersectionObserver === 'undefined') return;

  const sections = Object.keys(SECTION_TO_NAV_ID)
    .map(id => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;

  function setActiveNavId(navId) {
    document.querySelectorAll('.site-links a[id^="nav"]').forEach(a => {
      const isActive = a.id === navId;
      a.classList.toggle('is-active-section', isActive);
      if (isActive) a.setAttribute('aria-current', 'true');
      else if (!a.classList.contains('is-active-page')) a.removeAttribute('aria-current');
    });
  }

  const observer = new IntersectionObserver(entries => {
    const topMost = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (topMost) {
      const navId = SECTION_TO_NAV_ID[topMost.target.id];
      if (navId) setActiveNavId(navId);
    }
  }, { rootMargin: '-80px 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

  sections.forEach(section => observer.observe(section));
}

export function initSiteNav() {
  markActiveLink();
  initActiveSectionTracking();

  const menuBtn = document.getElementById('navMenuToggle');
  const linksPanel = document.getElementById('siteLinksPanel');
  const backdrop = document.getElementById('navBackdrop');
  if (!menuBtn || !linksPanel) return;

  // Guard against a second initSiteNav() call ever attaching a duplicate
  // set of listeners to the same elements (e.g. if the caller's init runs twice).
  if (menuBtn.dataset.navBound === 'true') return;
  menuBtn.dataset.navBound = 'true';

  const isMenuOpen = () => linksPanel.classList.contains('is-open');

  function updateTriggerLabel() {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
    const t = siteI18n[lang];
    menuBtn.setAttribute('aria-label', isMenuOpen() ? t.nav_menu_close : t.nav_menu_open);
  }

  function openMenu() {
    linksPanel.classList.add('is-open');
    backdrop?.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    updateTriggerLabel();
  }

  function closeMenu({ returnFocus = false } = {}) {
    if (!isMenuOpen()) return;
    linksPanel.classList.remove('is-open');
    backdrop?.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    updateTriggerLabel();
    if (returnFocus) menuBtn.focus();
  }

  menuBtn.addEventListener('click', () => {
    if (isMenuOpen()) closeMenu();
    else openMenu();
  });

  linksPanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  backdrop?.addEventListener('click', () => closeMenu({ returnFocus: true }));

  document.addEventListener('click', e => {
    if (!isMenuOpen()) return;
    if (linksPanel.contains(e.target) || menuBtn.contains(e.target)) return;
    closeMenu({ returnFocus: true });
  });

  document.addEventListener('keydown', e => {
    if (!isMenuOpen()) return;

    if (e.key === 'Escape') {
      closeMenu({ returnFocus: true });
      return;
    }

    if (e.key === 'Tab') {
      const focusable = [menuBtn, ...linksPanel.querySelectorAll('a')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  window.matchMedia(MOBILE_MEDIA_QUERY).addEventListener('change', e => {
    if (!e.matches) closeMenu();
  });
}
