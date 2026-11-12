import { guide } from '../content/work.ts';
import { html, type SafeHtml } from '../lib/html.ts';
import type { RenderContext } from './context.ts';
import { evidenceRows, renderRows } from './rows.ts';

// The recreated screens are always Arabic RTL, like the original guide, on
// both language pages. Every label below is placeholder content: generic
// module names, steps and roles, with no organization, system or real
// procedure. Controls only change this demo's own state; nothing is sent.

/** Splits a phrase around its keyword so the match can be highlighted. */
export function splitOnKeyword(phrase: string, keyword: string): [string, string, string] {
  const at = phrase.indexOf(keyword);
  if (at < 0) throw new Error(`Keyword "${keyword}" not found in "${phrase}"`);
  return [phrase.slice(0, at), keyword, phrase.slice(at + keyword.length)];
}

const STEPS = ['افتح وحدة الطلبات', 'اختر «طلب جديد»', 'أكمل الحقول الإلزامية', 'أرسل الطلب للاعتماد'];
const ROLES = [
  ['مدخل الطلبات', 'ينشئ الطلب'],
  ['المشرف', 'يعتمد الطلب'],
  ['المدير', 'يراجع التقارير'],
];

const procedure = html`
  <p class="g-crumb">الطلبات › إنشاء طلب</p>
  <p class="g-h">إنشاء طلب جديد</p>
  <button type="button" class="g-chip" data-go="permissions" data-needs-js>يعتمده: المشرف</button>
  <ol class="g-steps">${STEPS.map((s) => html`<li>${s}</li>`)}</ol>
  <div class="g-video"><span>شرح مرئي</span><span class="g-time">1:20</span></div>
`;

const assistant = html`
  <div class="g-chat" data-chat>
    <p class="g-msg g-msg--bot">كيف أقدر أساعدك؟</p>
    ${guide.routes.map((r, i) => {
      const [pre, match, post] = splitOnKeyword(r.phrase, r.keyword);
      return html`
        <div class="g-exchange" data-exchange="${i}">
          <p class="g-msg g-msg--user">${pre}<mark>${match}</mark>${post}</p>
          <p class="g-msg g-msg--bot g-route" data-reply>
            <span class="g-kw">${r.keyword}</span>
            <button type="button" class="g-dest" data-go="${r.go}" data-needs-js>${r.destination}</button>
          </p>
        </div>
      `;
    })}
    <p class="g-typing" data-typing hidden aria-hidden="true"><i></i><i></i><i></i></p>
  </div>
  <div class="g-asks" role="group" aria-label="أسئلة مقترحة" data-needs-js>
    ${guide.routes.map((r, i) => html`<button type="button" data-ask="${i}">${r.phrase}</button>`)}
  </div>
`;

const support = html`
  <p class="g-h">طلب دعم تقني <span class="g-ext">امتداد</span></p>
  <ol class="g-stepper" data-stepper>
    <li class="is-done">التحقق</li><li class="is-on" data-step="details">التفاصيل</li><li data-step="preview">المعاينة</li><li>طلباتي</li>
  </ol>
  <form class="g-form" data-support novalidate>
    <div class="g-types" role="group" aria-label="نوع الطلب">
      <button type="button" data-type="طلب خدمة" aria-pressed="true">طلب خدمة</button>
      <button type="button" data-type="بلاغ عن مشكلة" aria-pressed="false">بلاغ عن مشكلة</button>
    </div>
    <label class="g-label">الموضوع<input name="subject" maxlength="60" autocomplete="off" placeholder="مثال: تحديث بيانات" /></label>
    <label class="g-label">التفاصيل<textarea name="details" rows="3" maxlength="200" placeholder="اشرح الطلب باختصار"></textarea></label>
    <p class="g-error" data-error role="alert" hidden>أدخل الموضوع أولًا.</p>
    <button type="submit" class="g-btn">معاينة الطلب</button>
  </form>
  <div class="g-preview" data-preview hidden>
    <dl>
      <div><dt>النوع</dt><dd data-out="type"></dd></div>
      <div><dt>الموضوع</dt><dd data-out="subject"></dd></div>
      <div><dt>التفاصيل</dt><dd data-out="details"></dd></div>
    </dl>
    <button type="button" class="g-btn g-btn--ghost" data-edit>تعديل</button>
  </div>
`;

const permissions = html`
  <button type="button" class="g-back" data-back data-needs-js>رجوع</button>
  <p class="g-h">الصلاحيات والاعتمادات</p>
  <ul class="g-roles">${ROLES.map(([role, can], i) => html`<li${i === 1 ? html` class="is-focus"` : null}><b>${role}</b><span>${can}</span></li>`)}</ul>
`;

const SCREENS: Record<string, SafeHtml> = { procedure, assistant, support, permissions };

export function renderGuide(ctx: RenderContext): SafeHtml {
  const { locale, t } = ctx;
  const g = t.guide;
  const navScreens = guide.screens.filter((s) => s.tab);
  return html`
    <section class="work" id="guide" aria-labelledby="guide-title">
      <div class="work-grid">
        <div class="work-copy">
          <p class="work-tag"><span class="status-dot" data-state="live" aria-hidden="true"></span><span lang="en" dir="ltr">MkDocs · Production</span></p>
          <h2 id="guide-title">${g.title}</h2>
          <p class="work-lede">${g.lede}</p>
        </div>

        <figure class="showcase" data-showcase aria-label="${g.screensLabel}">
          <span class="showcase-badge">${g.illustration}</span>
          <div class="device">
            <div class="device-screen" dir="rtl" lang="ar">
              <div class="g-bar"><span class="g-menu" aria-hidden="true"></span><span>دليل المستخدم</span></div>
              <div class="g-viewport">
                <div class="g-track" data-track>
                  ${guide.screens.map(
                    (s, i) => html`<div class="g-screen g-screen--${s.id}${i === 0 ? ' is-on' : ''}" data-screen="${s.id}" tabindex="-1">${SCREENS[s.id]}</div>`,
                  )}
                </div>
              </div>
              <nav class="g-tabbar" aria-label="التنقل في الدليل" data-needs-js>
                ${navScreens.map(
                  (s, i) => html`<button type="button" data-go="${s.id}"${i === 0 ? html` aria-current="true"` : null}>${s.tab!.ar}</button>`,
                )}
              </nav>
            </div>
          </div>
          <figcaption class="captions" aria-live="polite">
            ${guide.screens.map(
              (s, i) => html`<span class="caption${i === 0 ? ' is-on' : ''}" data-caption="${s.id}">${s.caption[locale]}</span>`,
            )}
          </figcaption>
        </figure>

        <div class="work-more">${renderRows(evidenceRows(guide.evidence, ctx))}</div>
      </div>
    </section>
  `;
}
