import { opsI18n, opsFileTree } from '../data/operations-translations.js';
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

function renderProblem(s) {
  return fileHeader(s.title) + `<p>${esc(s.body)}</p>`;
}

function renderWhyMkdocs(s) {
  return fileHeader(s.title) +
    `<p>${esc(s.body)}</p>` +
    `<div class="dossier-tradeoff">
      <span class="dossier-callout-tag">${esc(s.tradeoffLabel)}</span>
      <p>${esc(s.tradeoffBody)}</p>
    </div>`;
}

function renderArchitecture(s) {
  const layers = s.layers.map((l, i) => `
    <div class="eval-type">
      <span class="eval-type-num">${i + 1}</span>
      <div>
        <p class="eval-type-title">${esc(l.title)}</p>
        <p class="eval-type-body">${esc(l.body)}</p>
      </div>
    </div>`).join('');

  return fileHeader(s.title) + `<div class="eval-types">${layers}</div>`;
}

function renderEmbedded(s) {
  return fileHeader(s.title) + `<p>${esc(s.body)}</p>`;
}

function renderAssistant(s) {
  const examples = s.examples.map(ex => `
    <div class="example-block">
      <h3>${esc(ex.q)}</h3>
      <p>${esc(ex.a)}</p>
    </div>`).join('');

  return fileHeader(s.title) +
    paragraphs(s.body) +
    `<p class="dossier-diagram-title">${esc(s.exampleLabel)}</p>` +
    examples;
}

function renderGuidance(s) {
  return fileHeader(s.title) + `<p>${esc(s.body)}</p>`;
}

function renderImpact(s) {
  return fileHeader(s.title) +
    `<p>${esc(s.intro)}</p>` +
    `<ul class="dossier-boundaries">${s.list.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

function renderEscalation(s) {
  return fileHeader(s.title) + `<p>${esc(s.body)}</p>`;
}

function renderTradeoffs(s) {
  const items = s.list.map((t, i) => `
    <div class="eval-type">
      <span class="eval-type-num">${i + 1}</span>
      <div>
        <p class="eval-type-title">${esc(t.title)}</p>
        <p class="eval-type-body">${esc(t.body)}</p>
      </div>
    </div>`).join('');

  return fileHeader(s.title) + `<div class="eval-types">${items}</div>`;
}

function renderRole(s) {
  return fileHeader(s.title) + `<p>${esc(s.body)}</p>`;
}

function renderCurrent(s) {
  return fileHeader(s.title) + `<p>${esc(s.body)}</p>`;
}

function renderFileNav(lang) {
  const t = opsI18n[lang];
  const numKey = lang === 'ar' ? 'num_ar' : 'num_en';
  return opsFileTree.map(f => `
    <a href="#ops-sec-${f.id}" data-target="ops-sec-${f.id}" class="filetree-link">
      <span class="filetree-file">${esc(f[numKey])}</span>
      <span class="filetree-title">${esc(t.sections[f.sectionKey].title)}</span>
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

export function applyOperationsTranslations(lang) {
  const t = opsI18n[lang];
  if (!t) return;

  document.title = t.page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t.meta_description);

  setText('opsHeroKicker', t.hero.kicker);
  setText('opsHeroTitle', t.hero.title);
  setText('opsHeroIntro', t.hero.intro);

  setText('opsFiletreeHeading', t.filetree_label);
  setText('opsMobileFilesLabel', t.filetree_label);
  setHtml('opsFiletreeNav', renderFileNav(lang));
  setHtml('opsMobileFilesStrip', renderFileNav(lang));

  setHtml('ops-sec-problem', renderProblem(t.sections.problem));
  setHtml('ops-sec-mkdocs', renderWhyMkdocs(t.sections.whyMkdocs));
  setHtml('ops-sec-architecture', renderArchitecture(t.sections.architecture));
  setHtml('ops-sec-embedded', renderEmbedded(t.sections.embedded));
  setHtml('ops-sec-assistant', renderAssistant(t.sections.assistant));
  setHtml('ops-sec-guidance', renderGuidance(t.sections.guidance));
  setHtml('ops-sec-impact', renderImpact(t.sections.impact));
  setHtml('ops-sec-escalation', renderEscalation(t.sections.escalation));
  setHtml('ops-sec-tradeoffs', renderTradeoffs(t.sections.tradeoffs));
  setHtml('ops-sec-role', renderRole(t.sections.role));
  setHtml('ops-sec-current', renderCurrent(t.sections.current));

  setText('navHome', lang === 'ar' ? 'الرئيسية' : 'Home');
  setText('opsBackText', lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Homepage');
  setText('footerText', siteI18n[lang].footer);

  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'AR';

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}
