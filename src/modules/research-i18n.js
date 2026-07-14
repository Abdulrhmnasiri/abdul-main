import { researchI18n, researchFileTree, statusLabels } from '../data/research-translations.js';
import { siteI18n } from '../data/site-translations.js';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function fileHeader(title) {
  return `<h2>${esc(title)}</h2>`;
}

function paragraphs(arr) {
  return arr.map(p => `<p>${esc(p)}</p>`).join('');
}

function flowDiagram(nodes, branch, lang) {
  const chain = nodes.map((n, i) => {
    const box = `<li class="flow-node">${esc(n)}</li>`;
    return i === 0 ? box : `<li class="flow-arrow" aria-hidden="true">→</li>${box}`;
  }).join('');

  // Rejection branch reuses the decision-outcome row already established
  // elsewhere on the page (gates/evaluation yes-no rows), so a single
  // labeled text row communicates "this leaves the main path" instead of
  // a side arrow the mobile layout couldn't place clearly.
  const branchHtml = branch ? `
    <div class="flow-branch-outcome">
      <span class="dossier-callout-tag">${lang === 'ar' ? 'عند الرفض' : 'If rejected'}</span>
      <div class="decision-outcomes">
        <div class="decision-outcome decision-outcome--no">
          <span class="decision-mark" aria-hidden="true">✕</span>
          <span>${esc(branch.label)} — ${esc(branch.target)}</span>
        </div>
      </div>
    </div>` : '';

  return `<div class="flow-diagram-wrap"><ol class="flow-diagram">${chain}</ol>${branchHtml}</div>`;
}

function decisionDiagram(nodes, yesText, noText) {
  const chain = nodes.map((n, i) => {
    const box = `<li class="flow-node">${esc(n)}</li>`;
    return i === 0 ? box : `<li class="flow-arrow" aria-hidden="true">→</li>${box}`;
  }).join('');

  return `<div class="flow-diagram-wrap">
    <ol class="flow-diagram">${chain}</ol>
    <div class="decision-outcomes">
      <div class="decision-outcome decision-outcome--yes"><span class="decision-mark" aria-hidden="true">✓</span><span>${esc(yesText)}</span></div>
      <div class="decision-outcome decision-outcome--no"><span class="decision-mark" aria-hidden="true">✕</span><span>${esc(noText)}</span></div>
    </div>
  </div>`;
}

function verifiedNote(label, text) {
  return `<div class="dossier-callout dossier-callout--verified">
    <span class="dossier-callout-tag">${esc(label)}</span>
    <p>${esc(text)}</p>
  </div>`;
}

function renderOverview(t) {
  const s = t.sections.overview;
  return fileHeader(s.title) +
    `<p class="dossier-question">${esc(s.question)}</p>` +
    paragraphs(s.body) +
    `<div class="dossier-callout"><span class="dossier-callout-tag">${t.lang === 'ar' ? 'ملاحظة بحثية' : 'Research note'}</span><p>${esc(s.note)}</p></div>`;
}

function renderQuestion(t) {
  const s = t.sections.question;
  return fileHeader(s.title) +
    paragraphs(s.body) +
    `<ol class="dossier-boundaries">${s.boundaries.map(b => `<li>${esc(b)}</li>`).join('')}</ol>` +
    `<div class="dossier-callout dossier-callout--muted"><span class="dossier-callout-tag">${t.lang === 'ar' ? 'لا يُدَّعى' : 'Not claimed'}</span><p>${esc(s.notClaimed)}</p></div>`;
}

function renderAuthority(t) {
  const s = t.sections.authority;
  return fileHeader(s.title) +
    `<p class="dossier-diagram-title">${esc(s.diagramTitle)}</p>` +
    flowDiagram(s.nodes, { label: s.branchLabel, target: s.branchTarget }, t.lang) +
    `<p class="dossier-caption">${esc(s.caption)}</p>` +
    verifiedNote(s.verifiedLabel, s.verified);
}

function renderVerification(t) {
  const s = t.sections.verification;
  const states = s.states.map(st => `
    <div class="verify-state">
      <span class="verify-state-label">${esc(st.label)}</span>
      <span class="verify-state-desc">${esc(st.desc)}</span>
    </div>`).join('');
  return fileHeader(s.title) +
    paragraphs(s.body) +
    `<div class="verify-states">${states}</div>` +
    `<p>${esc(s.closing)}</p>`;
}

function renderGates(t) {
  const s = t.sections.gates;
  return fileHeader(s.title) +
    `<p>${esc(s.body)}</p>` +
    decisionDiagram(s.diagramNodes, s.diagramYes, s.diagramNo) +
    verifiedNote(s.verifiedLabel, s.verified);
}

function renderBoundaries(t) {
  const s = t.sections.boundaries;
  return fileHeader(s.title) +
    `<p>${esc(s.body)}</p>` +
    flowDiagram(s.diagramNodes) +
    `<div class="decision-outcomes decision-outcomes--providers">
      <div class="decision-outcome decision-outcome--yes"><span class="decision-mark" aria-hidden="true">✓</span><span>${esc(s.diagramBranchA)}</span></div>
      <div class="decision-outcome decision-outcome--no"><span class="decision-mark" aria-hidden="true">✕</span><span>${esc(s.diagramBranchB)}</span></div>
    </div>` +
    `<div class="dossier-callout dossier-callout--muted"><span class="dossier-callout-tag">${esc(s.limitationLabel)}</span><p>${esc(s.limitation)}</p></div>` +
    `<div class="dossier-tradeoff">
      <span class="dossier-callout-tag">${esc(s.tradeoffLabel)}</span>
      <p>${esc(s.tradeoffCost)}</p>
      <p>${esc(s.tradeoffBenefit)}</p>
    </div>`;
}

function renderEvaluation(t) {
  const s = t.sections.evaluation;
  const types = s.types.map((ty, i) => `
    <div class="eval-type">
      <span class="eval-type-num">${i + 1}</span>
      <div>
        <p class="eval-type-title">${esc(ty.title)}</p>
        <p class="eval-type-body">${esc(ty.body)}</p>
      </div>
    </div>`).join('');

  return fileHeader(s.title) +
    `<div class="eval-types">${types}</div>` +
    decisionDiagram(s.flowNodes, s.flowYes, s.flowNo) +
    `<blockquote class="dossier-clarification">${esc(s.clarification)}</blockquote>` +

    `<div class="dossier-subsection">
      <h3>${esc(s.evidenceFirst.title)}</h3>
      <p>${esc(s.evidenceFirst.body)}</p>
      <div class="dossier-callout dossier-callout--muted"><p>${esc(s.evidenceFirst.note)}</p></div>
    </div>` +

    `<div class="dossier-subsection">
      <h3>${esc(s.boundedPreview.title)}</h3>
      <p>${esc(s.boundedPreview.body)}</p>
      <div class="compare-row">
        <div class="compare-box compare-box--rejected">
          <span class="dossier-callout-tag">${esc(s.boundedPreview.rejectedLabel)}</span>
          <p>${esc(s.boundedPreview.rejected)}</p>
        </div>
        <div class="compare-box compare-box--chosen">
          <span class="dossier-callout-tag">${esc(s.boundedPreview.chosenLabel)}</span>
          <p>${esc(s.boundedPreview.chosen)}</p>
        </div>
      </div>
    </div>`;
}

function statusClass(code) {
  if (code === 'implemented') return 'is-implemented';
  if (code === 'mock') return 'is-mock';
  if (code === 'not_connected') return 'is-not-connected';
  if (code === 'under_validation') return 'is-validation';
  if (code === 'out_of_scope') return 'is-out-of-scope';
  return '';
}

function renderFindings(t) {
  const s = t.sections.findings;
  const labels = statusLabels[t.lang] || statusLabels.en;
  const rows = s.matrix.map(([area, code, note]) => `
    <tr>
      <th scope="row">${esc(area)}</th>
      <td><span class="status-pill ${statusClass(code)}">${esc(labels[code] ?? code)}</span></td>
      <td>${esc(note)}</td>
    </tr>`).join('');

  const list = (title, items) => `
    <div class="dossier-findings-list">
      <h3>${esc(title)}</h3>
      <ul>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>`;

  const scrollRegionLabel = t.lang === 'ar'
    ? 'منطقة قابلة للتمرير أفقيًا: مصفوفة مستويات التحقق'
    : 'Horizontally scrollable region: verification-levels matrix';

  return fileHeader(s.title) +
    `<div class="status-matrix-wrap" tabindex="0" role="group" aria-label="${esc(scrollRegionLabel)}"><table class="status-matrix">
      <caption class="sr-only">${esc(s.matrixCaption)}</caption>
      <thead><tr><th scope="col">${esc(s.matrixHead[0])}</th><th scope="col">${esc(s.matrixHead[1])}</th><th scope="col">${esc(s.matrixHead[2])}</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>` +
    list(s.verifiedTitle, s.verifiedList) +
    list(s.underStudyTitle, s.underStudyList) +
    list(s.notInferredTitle, s.notInferredList);
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

  setHtml('sec-overview', renderOverview(t));
  setHtml('sec-question', renderQuestion(t));
  setHtml('sec-authority', renderAuthority(t));
  setHtml('sec-verification', renderVerification(t));
  setHtml('sec-gates', renderGates(t));
  setHtml('sec-boundaries', renderBoundaries(t));
  setHtml('sec-evaluation', renderEvaluation(t));
  setHtml('sec-findings', renderFindings(t));

  setText('conclusionTitle', t.conclusion.title);
  setHtml('conclusionBody', paragraphs(t.conclusion.body));

  setText('navHome', lang === 'ar' ? 'الرئيسية' : 'Home');
  setText('dossierBackText', lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Homepage');
  setText('footerText', siteI18n[lang].footer);

  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'AR';

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}
