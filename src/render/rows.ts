import type { Evidence } from '../content/types.ts';
import { html, type SafeHtml } from '../lib/html.ts';
import type { RenderContext } from './context.ts';

export interface Row {
  title: string;
  body: SafeHtml;
}

/**
 * A flat group of collapsed disclosure rows. Native <details> keeps keyboard
 * and screen-reader behavior with no script; `data-animate` lets the client
 * add a smooth open and close. Every row starts collapsed so the project is
 * seen first and its engineering detail only on request.
 */
export function renderRows(rows: Row[]): SafeHtml {
  return html`
    <div class="rows">
      ${rows.map(
        (row) => html`
          <details class="row" data-animate>
            <summary>${row.title}</summary>
            <div class="row-panel"><div class="row-body">${row.body}</div></div>
          </details>
        `,
      )}
    </div>
  `;
}

/** The three evidence rows every project shares. */
export function evidenceRows(evidence: Evidence, { locale, t }: RenderContext): Row[] {
  const e = t.evidence;
  return [
    {
      title: e.decisions,
      body: html`<ul class="decision-list">
        ${evidence.decisions.map((d) => html`<li><strong>${d.title[locale]}</strong><span>${d.body[locale]}</span></li>`)}
      </ul>`,
    },
    {
      title: e.technologies,
      body: html`<ul class="chips" lang="en" dir="ltr">${evidence.technologies.map((x) => html`<li>${x}</li>`)}</ul>`,
    },
    {
      title: e.skills,
      body: html`<ul class="chips">${evidence.skills.map((x) => html`<li>${x[locale]}</li>`)}</ul>`,
    },
  ];
}
