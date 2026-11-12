import { statusRows } from '../content/status.ts';
import { advisor } from '../content/work.ts';
import { GATE_NODES, gateStates } from '../lib/gate.ts';
import { html, type SafeHtml } from '../lib/html.ts';
import type { RenderContext } from './context.ts';
import { evidenceRows, renderRows } from './rows.ts';

// The phone replays a recorded exchange, in the product's own language, on
// both pages; the captions beneath carry the page language. Only the
// controls change this demo's own state: nothing is stored or sent.
const UI = {
  title: 'مستشار مهني',
  rail: ['الفهم', 'الصياغة', 'الاعتماد'],
  next: 'التالي',
  suggested: 'الصياغة المقترحة',
  confirm: 'اعتماد',
  edit: 'تعديل',
  cancelEdit: 'إلغاء',
  reject: 'رفض',
  saved: 'حُفظت الصياغة',
  rejected: 'رُفضت الصياغة',
  rejectedNote: 'لم يُحفظ شيء.',
  nextOpen: 'المرحلة التالية مفتوحة',
  nextLocked: 'تُفتح المرحلة التالية بعد الاعتماد.',
  empty: 'اكتب الصياغة أولًا.',
  replay: 'أعد المثال',
};

function renderConsult(ctx: RenderContext): SafeHtml {
  const { locale, t } = ctx;
  const c = t.advisor;
  const k = advisor.consult;
  const captions = Object.entries(k.captions);
  return html`
    <figure class="showcase consult" data-consult aria-label="${c.interactive}"
      data-ui-edit="${UI.edit}" data-ui-cancel="${UI.cancelEdit}" data-ui-empty="${UI.empty}" data-ui-locked="${UI.nextLocked}"
      data-ui-saved="${UI.saved}" data-ui-rejected="${UI.rejected}" data-ui-rejected-note="${UI.rejectedNote}" data-ui-open="${UI.nextOpen}">
      <span class="showcase-badge">${c.interactive}</span>
      <div class="device device--tall">
        <div class="device-screen c-screen" dir="rtl" lang="ar">
          <div class="c-head">
            <span class="c-title">${UI.title}</span>
            <ol class="c-rail" data-rail>
              ${UI.rail.map((label, i) => html`<li data-stage="${i}"><span>${label}</span></li>`)}
              <li data-stage="3"><button type="button" class="c-next" data-next aria-disabled="true" data-needs-js>${UI.next}<i class="c-lock" aria-hidden="true"></i></button></li>
            </ol>
          </div>
          <div class="c-body" tabindex="-1" role="log" aria-live="polite" data-body>
            <p class="c-msg c-msg--me" data-beat="0">${k.candidate}</p>
            <p class="c-msg c-msg--adv" data-beat="1">${k.read}</p>
            <div class="c-card" data-beat="2">
              <span class="c-label">${UI.suggested}</span>
              <p class="c-wording" data-wording>${k.wording}</p>
              <textarea class="c-field" data-field rows="6" maxlength="240" hidden aria-label="${UI.suggested}"></textarea>
            </div>
            <p class="c-msg c-msg--adv" data-beat="3">${k.question}</p>
            <p class="c-typing" data-typing hidden aria-hidden="true"><i></i><i></i><i></i></p>
          </div>
          <p class="c-hint" data-hint role="status" hidden></p>
          <div class="c-actions" data-actions hidden>
            <button type="button" class="c-btn c-btn--primary" data-act="confirm">${UI.confirm}</button>
            <button type="button" class="c-btn" data-act="edit" data-edit-btn>${UI.edit}</button>
            <button type="button" class="c-btn c-btn--quiet" data-act="reject">${UI.reject}</button>
          </div>
          <div class="c-result" data-result tabindex="-1" hidden>
            <p class="c-result-title" data-result-title></p>
            <p class="c-result-body" data-result-body></p>
            <p class="c-result-next" data-result-next></p>
            <button type="button" class="c-btn" data-replay>${UI.replay}</button>
          </div>
        </div>
      </div>
      <figcaption class="captions" aria-live="polite">
        ${captions.map(
          ([id, text], i) => html`<span class="caption${i === 0 ? ' is-on' : ''}" data-caption="${id}">${text[locale]}</span>`,
        )}
      </figcaption>
      <p class="fineprint">${c.recorded}</p>
    </figure>
  `;
}

function renderGate({ locale, t }: RenderContext): SafeHtml {
  const c = t.advisor;
  const first = advisor.gate[0]!;
  const states = gateStates(first.stop);
  return html`
    <div class="gate" data-gate>
      <h3 class="label">${c.gateTitle}</h3>
      <div class="gate-inputs" role="group" aria-label="${c.gateHint}">
        ${advisor.gate.map(
          (g, i) => html`
            <button type="button" data-gate-example="${g.id}" data-stop="${g.stop}" aria-pressed="${i === 0 ? 'true' : 'false'}">
              <span class="gate-statement">${g.statement[locale]}</span>
              <span class="gate-origin">${g.origin[locale]}</span>
            </button>
          `,
        )}
      </div>
      <ol class="gate-rail">
        ${GATE_NODES.map((node) => html`<li data-node="${node}" data-state="${states[node]}"><span>${c.nodes[node]}</span></li>`)}
      </ol>
      <p class="gate-outcome" aria-live="polite">
        ${advisor.gate.map(
          (g, i) => html`<span data-outcome="${g.id}" data-stop="${g.stop}"${i === 0 ? html` class="is-on"` : null}>${c.outcomes[g.stop]}</span>`,
        )}
      </p>
    </div>
  `;
}

export function renderAdvisor(ctx: RenderContext): SafeHtml {
  const { locale, t } = ctx;
  const c = t.advisor;
  const status = statusRows.find((r) => r.id === 'advisor')!;

  const statusRow = {
    title: t.evidence.status,
    body: html`
      <ul class="progress">
        ${advisor.status.map(
          (p) => html`
            <li data-state="${p.state}">
              <span class="progress-label">${p.label[locale]}${p.state === 'building' ? html` <span class="progress-flag">${c.building}</span>` : null}</span>
              ${p.note ? html`<span class="progress-note">${p.note[locale]}</span>` : null}
            </li>
          `,
        )}
      </ul>
      <p class="fineprint">${c.gateNote}</p>
    `,
  };

  return html`
    <section class="advisor" id="advisor" data-nav="guide" aria-labelledby="advisor-title">
      <header class="advisor-head">
        <p class="work-tag"><span class="status-dot" data-state="${status.state}" aria-hidden="true"></span>${status.value[locale]}</p>
        <h2 id="advisor-title" class="advisor-title">${c.title}</h2>
        <p class="work-lede">${c.lede}</p>
      </header>

      <div class="advisor-stage">
        ${renderConsult(ctx)}
        ${renderGate(ctx)}
      </div>

      ${advisor.demoUrl
        ? html`<a class="link-btn link-btn--primary demo-link" href="${advisor.demoUrl}" rel="noopener" target="_blank" lang="en" dir="ltr">${c.demoOn}</a>`
        : null}
      ${renderRows([statusRow, ...evidenceRows(advisor.evidence, ctx)])}
    </section>
  `;
}
