import { profile } from '../content/profile.ts';
import { html, type SafeHtml } from '../lib/html.ts';
import type { RenderContext } from './context.ts';
import { icons } from './icons.ts';

export function renderContact({ t, root }: RenderContext): SafeHtml {
  const f = t.contact.form;
  return html`
    <section class="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">${t.contact.title}</h2>
      <ul class="contact-links">
        <li>
          <button type="button" class="link-btn link-btn--primary" data-form-open aria-haspopup="dialog">
            ${icons.send} ${t.contact.message}
          </button>
        </li>
        <li><a class="link-btn" href="${profile.links.linkedin}" rel="me noopener" target="_blank">${icons.linkedin} LinkedIn</a></li>
        <li><a class="link-btn" href="${profile.links.github}" rel="me noopener" target="_blank">${icons.github} GitHub</a></li>
        <li><a class="link-btn" href="${root}${profile.cv}" download>${icons.download} ${t.contact.cv}</a></li>
      </ul>

      <dialog class="sheet" data-form-dialog aria-labelledby="form-title">
        <form class="message-form" data-form novalidate
          data-endpoint="${profile.contactForm.endpoint}"
          data-key="${profile.contactForm.accessKey}"
          data-script="${profile.contactForm.script}"
          data-msg-required="${f.required}"
          data-msg-captcha="${f.captcha}"
          data-msg-sending="${f.sending}"
          data-msg-sent="${f.sent}"
          data-msg-failed="${f.failed}">
          <div class="sheet-head">
            <h3 id="form-title">${f.title}</h3>
            <button type="button" class="icon-btn" data-form-close aria-label="${f.close}">${icons.close}</button>
          </div>
          <label>${f.name}<input name="name" autocomplete="name" maxlength="120" required /></label>
          <label>${f.email}<input name="email" type="email" autocomplete="email" maxlength="180" dir="ltr" required /></label>
          <label>${f.body}<textarea name="message" rows="4" maxlength="2000" required></textarea></label>
          <div class="honeypot" aria-hidden="true"><input name="website" tabindex="-1" autocomplete="off" /></div>
          <div class="h-captcha" data-captcha="true" data-size="compact"></div>
          <button type="submit" class="link-btn link-btn--primary">${f.submit}</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </dialog>
    </section>
  `;
}
