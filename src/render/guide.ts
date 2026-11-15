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
    <div class="g-video" data-video-open><span class="g-play" aria-hidden="true"></span><span>${p.video}</span><span class="g-time">0:24</span>${renderWalkthrough(locale)}</div>
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
    <p class="g-h">${p.support}</p>
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

const WALK = {
  ar: {
    modules: ['لوحة المعلومات', 'الطلبات', 'التقارير', 'الإعدادات'],
    list: 'الطلبات',
    add: 'طلب جديد',
    subject: 'تحديث بيانات',
    details: 'تحديث رقم التواصل',
    submit: 'إرسال للاعتماد',
    sent: 'أُرسل الطلب للاعتماد',
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    replay: 'إعادة التشغيل',
    close: 'إغلاق',
  },
  en: {
    modules: ['Dashboard', 'Requests', 'Reports', 'Settings'],
    list: 'Requests',
    add: 'New request',
    subject: 'Update my details',
    details: 'Update my contact number',
    submit: 'Submit for approval',
    sent: 'Sent for approval',
    play: 'Play',
    pause: 'Pause',
    replay: 'Replay',
    close: 'Close',
  },
} as const;

/** Index of the "Requests" module in the drawer; the pointer opens this one. */
const REQUESTS_MODULE = 1;

/**
 * The walkthrough plays inside the procedure page's own video card, so the
 * numbered steps above it stay visible and are ticked off as it runs. It is a
 * scripted placeholder interface, not a recording of the production system:
 * generic module names and sample text only. src/client/walkthrough.ts drives
 * it from one timeline.
 */
function renderWalkthrough(locale: Locale): SafeHtml {
  const p = PHONE[locale];
  const w = WALK[locale];
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const skeleton = (n: number) => html`<div class="w-skel">${Array.from({ length: n }, () => html`<i></i>`)}</div>`;
  return html`
    <div class="w" data-walk hidden role="group" aria-label="${p.video}" dir="${dir}" lang="${locale}" data-scene="home">
      <div class="w-stage" data-w-stage>
        <div class="w-top"><span class="w-menu" data-w="menu" aria-hidden="true"><i></i></span><b aria-hidden="true">${p.app}</b></div>
        <div class="w-scene w-scene--home" aria-hidden="true">${skeleton(2)}</div>
        <div class="w-scene w-scene--list" aria-hidden="true">
          <p class="w-h">${w.list}</p>
          <span class="w-btn" data-w="new">${w.add}</span>
        </div>
        <div class="w-scene w-scene--form" aria-hidden="true">
          <div class="w-fields">
            <div class="w-field" data-w="subject"><small>${p.subject}</small><span class="w-typed" data-text="${w.subject}"></span></div>
            <div class="w-field" data-w="details"><small>${p.details}</small><span class="w-typed" data-text="${w.details}"></span></div>
          </div>
          <span class="w-btn w-btn--primary" data-w="submit">${w.submit}</span>
        </div>
        <div class="w-scrim" aria-hidden="true"></div>
        <ul class="w-drawer" aria-hidden="true">
          ${w.modules.map((m, i) => html`<li${i === REQUESTS_MODULE ? html` data-w="module"` : null}>${m}</li>`)}
        </ul>
        <p class="w-toast" aria-hidden="true">${w.sent}</p>
        <svg class="w-ptr" data-w-ptr viewBox="0 0 16 20" aria-hidden="true"><path d="M1.5 1.2v14.3l3.8-3.6 2.7 6 2.3-1-2.7-5.9h5.3z" /></svg>
      </div>
      <div class="w-ctl">
        <button type="button" class="w-btn-ico" data-w-toggle data-label-play="${w.play}" data-label-pause="${w.pause}" aria-label="${w.pause}"><i aria-hidden="true"></i></button>
        <div class="w-prog" aria-hidden="true"><i data-w-prog></i></div>
        <button type="button" class="w-btn-ico w-btn-ico--replay" data-w-replay aria-label="${w.replay}"><i aria-hidden="true"></i></button>
        <button type="button" class="w-btn-ico w-btn-ico--close" data-w-close aria-label="${w.close}"><i aria-hidden="true"></i></button>
      </div>
    </div>
  `;
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
