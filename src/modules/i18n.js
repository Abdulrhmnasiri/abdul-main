import { appState } from './state.js';
import { i18n } from '../data/translations.js';

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined) el.textContent = value;
}

function setAccessibleLabel(id, value) {
  const el = document.getElementById(id);
  if (!el || value === undefined) return;
  el.setAttribute('aria-label', value);
  el.setAttribute('title', value);
}

export function applyTranslations() {
  const t = i18n[appState.lang];

  setText('profileName', t.profile_name);
  setText('heroEyebrow', t.hero_eyebrow);
  setText('profileHeadline', t.profile_headline);
  setText('profileSummary', t.profile_summary);
  setText('primaryBtn', t.primary_btn);
  setText('secondaryBtn', t.secondary_btn);

  setText('methodTitle', t.method_title);
  document.querySelectorAll('.method-stage').forEach((el, idx) => {
    const stage = t.method_stages[idx];
    if (!stage) return;
    const titleEl = el.querySelector('.method-stage-title');
    const bodyEl = el.querySelector('.method-stage-body');
    if (titleEl) titleEl.textContent = stage.title;
    if (bodyEl) bodyEl.textContent = stage.body;
  });

  setText('practiceKicker', t.practice_kicker);
  setText('practiceTitle', t.practice_title);
  setText('practiceBody', t.practice_body);

  setText('technicalKicker', t.technical_kicker);

  setText('productionTag', t.production_tag);
  setText('productionTitle', t.production_title);
  setText('productionBody', t.production_body);
  setText('productionCta', t.production_cta);

  setText('researchTag', t.research_tag);
  setText('technicalTitle', t.technical_title);
  setText('technicalBody', t.technical_body);
  setText('technicalCta', t.technical_cta);

  setAccessibleLabel('contactEmailIcon', t.contact_email);
  setAccessibleLabel('contactLinkedinIcon', t.contact_linkedin);
  setAccessibleLabel('contactGithubIcon', t.contact_github);

  setText('contactFormNameLabel', t.contact_form_name_label);
  setText('contactFormEmailLabel', t.contact_email);
  setText('contactFormMessageLabel', t.contact_form_message_label);
  setText('contactSubmitBtn', t.contact_form_submit);

  document.documentElement.lang = appState.lang;
  document.documentElement.dir = appState.lang === 'ar' ? 'rtl' : 'ltr';
}
