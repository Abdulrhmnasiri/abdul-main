import { researchI18n, researchFileTree } from '../data/research-translations.js';
import { siteI18n } from '../data/site-translations.js';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function paragraphs(arr) {
  return arr.map(p => `<p>${esc(p)}</p>`).join('');
}

function fileHeader(title) {
  return `<h2>${esc(title)}</h2>`;
}

function noteCallout(label, text, muted) {
  return `<div class="dossier-callout${muted ? ' dossier-callout--muted' : ''}">
    <span class="dossier-callout-tag">${esc(label)}</span>
    <p>${esc(text)}</p>
  </div>`;
}

function numberedList(items) {
  return `<div class="eval-types">${items.map((item, i) => `
    <div class="eval-type">
      <span class="eval-type-num">${i + 1}</span>
      <div>
        <p class="eval-type-title">${esc(item.title)}</p>
        <p class="eval-type-body">${esc(item.body)}</p>
      </div>
    </div>`).join('')}</div>`;
}

function renderAsset(s) {
  return fileHeader(s.title) +
    paragraphs(s.body) +
    `<ul class="dossier-boundaries">${s.list.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` +
    (s.note ? noteCallout(s.noteLabel, s.note, true) : '');
}

function renderConsultation(s) {
  return fileHeader(s.title) +
    paragraphs(s.body) +
    noteCallout(s.noteLabel, s.note, false);
}

function renderExpression(s) {
  return fileHeader(s.title) +
    paragraphs(s.body) +
    `<h3>${esc(s.examplesLabel)}</h3>` +
    `<p>${esc(s.examplesIntro)}</p>` +
    s.examples.map(ex => `
      <p class="dossier-diagram-title">${esc(ex.directionLabel)}</p>
      <div class="example-stages">
        <div class="example-stage example-stage--initial">
          <span class="dossier-callout-tag">${esc(s.initialLabel)}</span>
          <p>${esc(ex.initial)}</p>
        </div>
        <div class="example-stage example-stage--question">
          <span class="dossier-callout-tag">${esc(s.questionLabel)}</span>
          <p>${esc(ex.question)}</p>
        </div>
        <div class="example-stage example-stage--clarified">
          <span class="dossier-callout-tag">${esc(s.clarifiedLabel)}</span>
          <p>${esc(ex.clarified)}</p>
        </div>
      </div>`).join('') +
    noteCallout(s.noteLabel, s.note, true);
}

function renderDomains(s) {
  return fileHeader(s.title) +
    `<p>${esc(s.intro)}</p>` +
    numberedList(s.list) +
    noteCallout(s.noteLabel, s.note, true);
}

function renderContext(s) {
  return fileHeader(s.title) +
    paragraphs(s.body) +
    `<h3>${esc(s.trustTitle)}</h3>` +
    `<p>${esc(s.trustIntro)}</p>` +
    `<ul class="dossier-boundaries">${s.trustList.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

function renderWork(s) {
  return fileHeader(s.title) +
    `<p>${esc(s.intro)}</p>` +
    numberedList(s.list);
}

function renderSkills(s) {
  return fileHeader(s.title) +
    `<p>${esc(s.intro)}</p>` +
    numberedList(s.list) +
    (s.note ? noteCallout(s.noteLabel, s.note, true) : '');
}

function renderTechSkills(s) {
  return fileHeader(s.title) +
    `<p>${esc(s.intro)}</p>` +
    numberedList(s.list);
}

function renderMaturity(s) {
  return fileHeader(s.title) +
    `<p>${esc(s.intro)}</p>` +
    `<ul class="dossier-boundaries">${s.list.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` +
    (s.closing ? `<p>${esc(s.closing)}</p>` : '');
}

function renderFileNav(lang) {
  const t = researchI18n[lang];
  const fileKey = lang === 'ar' ? 'file_ar' : 'file_en';
  return researchFileTree.map(f => `
    <a href="#sec-${f.id}" data-target="sec-${f.id}" class="filetree-link">
      <span class="filetree-file">${esc(f[fileKey])}</span>
      <span class="filetree-title">${esc(t.sections[f.id].title)}</span>
    </a>`).join('');
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined) el.textContent = value;
}

export function applyResearchTranslations(lang) {
  const t = researchI18n[lang];
  if (!t) return;
  t.lang = lang;

  document.title = t.page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t.meta_description);

  setText('heroKicker', t.hero.kicker);
  setText('heroTitle', t.hero.title);
  setText('heroSubtitle', t.hero.subtitle);
  setText('heroIntro', t.hero.intro);
  setText('heroStatusNote', t.hero.statusNote);

  setText('filetreeHeading', t.filetree_label);
  setText('mobileFilesLabel', t.filetree_label);
  setHtml('filetreeNav', renderFileNav(lang));
  setHtml('mobileFilesStrip', renderFileNav(lang));

  setHtml('sec-asset', renderAsset(t.sections.asset));
  setHtml('sec-consultation', renderConsultation(t.sections.consultation));
  setHtml('sec-expression', renderExpression(t.sections.expression));
  setHtml('sec-domains', renderDomains(t.sections.domains));
  setHtml('sec-context', renderContext(t.sections.context));
  setHtml('sec-work', renderWork(t.sections.work));
  setHtml('sec-skills', renderSkills(t.sections.skills));
  setHtml('sec-techSkills', renderTechSkills(t.sections.techSkills));
  setHtml('sec-maturity', renderMaturity(t.sections.maturity));

  setText('navHome', lang === 'ar' ? 'الرئيسية' : 'Home');
  setText('dossierBackText', lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Homepage');
  setText('footerText', siteI18n[lang].footer);

  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'AR';

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}
