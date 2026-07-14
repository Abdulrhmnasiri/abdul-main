import { i18n } from '../data/translations.js';
import { appState } from './state.js';
import { contactConfig } from '../data/contact-config.js';

const MAX_NAME = 120;
const MAX_EMAIL = 180;
const MAX_MESSAGE = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFeedback(el, text, state) {
  el.textContent = text;
  if (state) el.dataset.state = state;
  else delete el.dataset.state;
}

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Guard against a second initContactForm() call attaching a duplicate
  // submit listener (the host environment has, on occasion, fired
  // DOMContentLoaded more than once).
  if (form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmailInput');
  const messageInput = document.getElementById('contactMessage');
  const honeypot = document.getElementById('contactWebsite');
  const feedback = document.getElementById('contactFormFeedback');
  const submitBtn = document.getElementById('contactSubmitBtn');

  // The email icon lives inside the same #contact section as the form, so
  // its job is to draw attention to the form rather than open a mail client
  // that would expose the recipient address in plain HTML.
  const emailIcon = document.getElementById('contactEmailIcon');
  emailIcon?.addEventListener('click', (event) => {
    event.preventDefault();
    nameInput?.focus();
    nameInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  function captchaResponse() {
    return document.querySelector('textarea[name="h-captcha-response"]')?.value.trim() || '';
  }
  function resetCaptcha() {
    if (window.hcaptcha) window.hcaptcha.reset();
  }

  let isSubmitting = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const t = i18n[appState.lang];
    const name = nameInput.value.trim().slice(0, MAX_NAME);
    const email = emailInput.value.trim().slice(0, MAX_EMAIL);
    const message = messageInput.value.trim().slice(0, MAX_MESSAGE);
    const isBot = honeypot.value.trim() !== '';

    // A real visitor never sees or fills the honeypot field. If it has a
    // value, silently drop the submission instead of flagging it as a
    // validation error.
    if (isBot) return;

    if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
      setFeedback(feedback, t.contact_form_error_required, 'error');
      return;
    }

    const hCaptchaToken = captchaResponse();
    if (!hCaptchaToken) {
      setFeedback(feedback, t.contact_form_error_captcha, 'error');
      return;
    }

    if (!contactConfig.web3FormsAccessKey) {
      console.warn('[contact-form] Web3Forms access key is not configured yet in src/data/contact-config.js.');
      setFeedback(feedback, t.contact_form_error_generic, 'error');
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    setFeedback(feedback, t.contact_form_sending, 'sending');

    try {
      const res = await fetch(contactConfig.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: contactConfig.web3FormsAccessKey,
          name,
          email,
          message,
          subject: `Portfolio contact — ${name}`,
          from_name: name,
          botcheck: isBot,
          'h-captcha-response': hCaptchaToken,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        form.reset();
        setFeedback(feedback, t.contact_form_success_endpoint, 'success');
      } else {
        setFeedback(feedback, t.contact_form_error_generic, 'error');
      }
    } catch (err) {
      setFeedback(feedback, t.contact_form_error_generic, 'error');
    } finally {
      isSubmitting = false;
      submitBtn.disabled = false;
      resetCaptcha();
    }
  });
}
