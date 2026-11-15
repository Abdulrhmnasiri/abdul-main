import type { Locale } from '../content/types.ts';
import { guide } from '../content/work.ts';
import { html, type SafeHtml } from '../lib/html.ts';
import type { RenderContext } from './context.ts';
import { evidenceRows, renderRows } from './rows.ts';

// The recreated screens follow the page language: Arabic is right-to-left,
// English left-to-right, and nothing inside the phone mixes the two. Every
// label is placeholder content: generic module names, steps and roles, with
// no organization, system or real procedure. Controls only change this
// demo's own state; nothing is sent.

/** Splits a phrase around its keyword so the match can be highlighted. */
export function splitOnKeyword(phrase: string, keyword: string): [string, string, string] {
  const at = phrase.indexOf(keyword);
  if (at < 0) throw new Error(`Keyword "${keyword}" not found in "${phrase}"`);
  return [phrase.slice(0, at), keyword, phrase.slice(at + keyword.length)];
}

const PHONE = {
  ar: {
    app: 'دليل المستخدم',
    nav: 'التنقل في الدليل',
    crumb: 'الطلبات › إنشاء طلب',
    heading: 'إنشاء طلب جديد',
    steps: ['افتح وحدة الطلبات', 'اختر «طلب جديد»', 'أكمل الحقول الإلزامية', 'أرسل الطلب للاعتماد'],
    video: 'شرح مرئي',
    greeting: 'كيف أقدر أساعدك؟',
    asks: 'أسئلة مقترحة',
    permissions: 'الصلاحيات والاعتمادات',
    back: 'رجوع',
    roles: [
      ['مدخل الطلبات', 'ينشئ الطلب'],
      ['المشرف', 'يعتمد الطلب'],
      ['المدير', 'يراجع التقارير'],
    ],
    support: 'طلب دعم تقني',
    extension: 'امتداد',
    stepper: ['التحقق', 'التفاصيل', 'المعاينة', 'طلباتي'],
    kinds: ['طلب خدمة', 'بلاغ عن مشكلة'],
    kindsLabel: 'نوع الطلب',
    subject: 'الموضوع',
    subjectHint: 'مثال: تحديث بيانات',
    details: 'التفاصيل',
    detailsHint: 'اشرح الطلب باختصار',
    required: 'أدخل الموضوع أولًا.',
    preview: 'معاينة الطلب',
    type: 'النوع',
    edit: 'تعديل',
  },
  en: {
    app: 'User Guide',
    nav: 'Guide navigation',
    crumb: 'Requests › Create a request',
    heading: 'Create a new request',
    steps: ['Open the Requests module', 'Choose “New request”', 'Complete the required fields', 'Submit for approval'],
    video: 'Video walkthrough',
    greeting: 'How can I help?',
    asks: 'Suggested questions',
    permissions: 'Permissions and approvals',
    back: 'Back',
    roles: [
      ['Requester', 'Creates the request'],
      ['Supervisor', 'Approves the request'],
      ['Manager', 'Reviews reports'],
    ],
    support: 'Technical support request',
    extension: 'Extension',
    stepper: ['Verify', 'Details', 'Preview', 'My requests'],
    kinds: ['Service request', 'Report a problem'],
    kindsLabel: 'Request type',
    subject: 'Subject',
    subjectHint: 'e.g. Update my details',
    details: 'Details',
    detailsHint: 'Describe the request briefly',
    required: 'Enter a subject first.',
    preview: 'Preview request',
    type: 'Type',
    edit: 'Edit',
  },
} as const;

function screens(locale: Locale): Record<string, SafeHtml> {
  const p = PHONE[locale];
  const procedure = html`
    <p class="g-crumb">${p.crumb}</p>
    <p class="g-h">${p.heading}</p>
    <ol class="g-steps">${p.steps.map((s) => html`<li>${s}</li>`)}</ol>
    <div class="g-video"><span>${p.video}</span><span class="g-time">1:20</span></div>
  `;

  const assistant = html`
    <div class="g-chat" data-chat>
      <p class="g-msg g-msg--bot">${p.greeting}</p>
      ${guide.routes.map((r, i) => {
        const [pre, match, post] = splitOnKeyword(r.phrase[locale], r.keyword[locale]);
        return html`
          <div class="g-exchange" data-exchange="${i}">
            <p class="g-msg g-msg--user">${pre}<mark>${match}</mark>${post}</p>
            <p class="g-msg g-msg--bot g-route" data-reply>
              <span class="g-kw">${r.keyword[locale]}</span>
              <button type="button" class="g-dest" data-go="${r.go}" data-needs-js>${r.destination[locale]}</button>
            </p>
          </div>
        `;
      })}
      <p class="g-typing" data-typing hidden aria-hidden="true"><i></i><i></i><i></i></p>
    </div>
    <div class="g-asks" role="group" aria-label="${p.asks}" data-needs-js>
      ${guide.routes.map((r, i) => html`<button type="button" data-ask="${i}">${r.phrase[locale]}</button>`)}
    </div>
  `;

  const support = html`
    <p class="g-h">${p.support} <span class="g-ext">${p.extension}</span></p>
    <ol class="g-stepper" data-stepper>
      <li class="is-done">${p.stepper[0]}</li><li class="is-on" data-step="details">${p.stepper[1]}</li><li data-step="preview">${p.stepper[2]}</li><li>${p.stepper[3]}</li>
    </ol>
    <form class="g-form" data-support novalidate>
      <div class="g-types" role="group" aria-label="${p.kindsLabel}">
        ${p.kinds.map((k, i) => html`<button type="button" data-type="${k}" aria-pressed="${i === 0 ? 'true' : 'false'}">${k}</button>`)}
      </div>
      <label class="g-label">${p.subject}<input name="subject" maxlength="60" autocomplete="off" placeholder="${p.subjectHint}" /></label>
      <label class="g-label">${p.details}<textarea name="details" rows="3" maxlength="200" placeholder="${p.detailsHint}"></textarea></label>
      <p class="g-error" data-error role="alert" hidden>${p.required}</p>
      <button type="submit" class="g-btn">${p.preview}</button>
    </form>
    <div class="g-preview" data-preview hidden>
      <dl>
        <div><dt>${p.type}</dt><dd data-out="type"></dd></div>
        <div><dt>${p.subject}</dt><dd data-out="subject"></dd></div>
        <div><dt>${p.details}</dt><dd data-out="details"></dd></div>
      </dl>
      <button type="button" class="g-btn g-btn--ghost" data-edit>${p.edit}</button>
    </div>
  `;

  const permissions = html`
    <button type="button" class="g-back" data-back data-needs-js>${p.back}</button>
    <p class="g-h">${p.permissions}</p>
    <ul class="g-roles">${p.roles.map(([role, can], i) => html`<li${i === 1 ? html` class="is-focus"` : null}><b>${role}</b><span>${can}</span></li>`)}</ul>
  `;

  return { procedure, assistant, support, permissions };
}

export function renderGuide(ctx: RenderContext): SafeHtml {
  const { locale, t } = ctx;
  const g = t.guide;
  const navScreens = guide.screens.filter((s) => s.tab);
  const p = PHONE[locale];
  const body = screens(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return html`
    <section class="work" id="guide" aria-labelledby="guide-title">
      <div class="work-grid">
        <div class="work-copy">
          <p class="work-tag"><span class="status-dot" data-state="live" aria-hidden="true"></span><span lang="en" dir="ltr">MkDocs · Production</span></p>
          <h2 id="guide-title">${g.title}</h2>
          <p class="work-lede">${g.lede}</p>
        </div>

        <figure class="showcase" data-showcase aria-label="${g.screensLabel}">
          <div class="device">
            <div class="device-screen" dir="${dir}" lang="${locale}">
              <div class="g-bar"><span class="g-menu" aria-hidden="true"></span><span>${p.app}</span></div>
              <div class="g-viewport">
                <div class="g-track" data-track>
                  ${guide.screens.map(
                    (s, i) => html`<div class="g-screen g-screen--${s.id}${i === 0 ? ' is-on' : ''}" data-screen="${s.id}" tabindex="-1">${body[s.id]}</div>`,
                  )}
                </div>
              </div>
              <nav class="g-tabbar" aria-label="${p.nav}" data-needs-js>
                ${navScreens.map(
                  (s, i) => html`<button type="button" data-go="${s.id}"${i === 0 ? html` aria-current="true"` : null}>${s.tab![locale]}</button>`,
                )}
              </nav>
              <span class="g-cursor" data-cursor aria-hidden="true"></span>
            </div>
          </div>
        </figure>

        <div class="work-more">${renderRows(evidenceRows(guide.evidence, ctx))}</div>
      </div>
    </section>
  `;
}
