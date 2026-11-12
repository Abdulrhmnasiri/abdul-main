// Contact form delivered by Web3Forms with an hCaptcha check. The captcha
// script is only fetched when the visitor opens the form, so the page itself
// loads no third-party code.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Messages {
  required: string;
  captcha: string;
  sending: string;
  sent: string;
  failed: string;
}

export type Validation = 'ok' | 'bot' | 'required';

/** Pure validation, kept separate from the DOM so it can be unit tested. */
export function validate(fields: { name: string; email: string; message: string; website: string }): Validation {
  if (fields.website.trim()) return 'bot';
  if (!fields.name.trim() || !fields.message.trim() || !EMAIL.test(fields.email.trim())) return 'required';
  return 'ok';
}

let scriptRequested = false;
function loadCaptchaScript(src: string): void {
  if (scriptRequested) return;
  scriptRequested = true;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.append(script);
}

export function initContactForm(root: ParentNode): void {
  const dialog = root.querySelector<HTMLDialogElement>('[data-form-dialog]');
  const form = dialog?.querySelector<HTMLFormElement>('[data-form]');
  const opener = root.querySelector<HTMLButtonElement>('[data-form-open]');
  const status = form?.querySelector<HTMLElement>('.form-status');
  const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!dialog || !form || !opener || !status || !submit) return;

  const d = form.dataset;
  const msg: Messages = {
    required: d.msgRequired ?? '',
    captcha: d.msgCaptcha ?? '',
    sending: d.msgSending ?? '',
    sent: d.msgSent ?? '',
    failed: d.msgFailed ?? '',
  };
  const say = (text: string, state?: string) => {
    status.textContent = text;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  opener.addEventListener('click', () => {
    // hCaptcha reads its theme once, when the script renders the widget.
    const captcha = form.querySelector<HTMLElement>('[data-captcha]');
    if (captcha && !scriptRequested) {
      captcha.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (d.script) loadCaptchaScript(d.script);
    dialog.showModal();
    form.querySelector('input')?.focus();
  });
  dialog.querySelector('[data-form-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  let busy = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;

    const data = new FormData(form);
    const fields = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      website: String(data.get('website') ?? ''),
    };
    const result = validate(fields);
    // A filled honeypot means a bot; drop it without telling it why.
    if (result === 'bot') return;
    if (result === 'required') return say(msg.required, 'error');

    const captcha = String(data.get('h-captcha-response') ?? '').trim();
    if (!captcha) return say(msg.captcha, 'error');

    busy = true;
    submit.disabled = true;
    say(msg.sending);
    try {
      const res = await fetch(d.endpoint ?? '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: d.key,
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
          subject: `Portfolio contact — ${fields.name.trim()}`,
          'h-captcha-response': captcha,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (res.ok && body.success) {
        form.reset();
        say(msg.sent, 'success');
      } else {
        say(msg.failed, 'error');
      }
    } catch {
      say(msg.failed, 'error');
    } finally {
      busy = false;
      submit.disabled = false;
      (window as { hcaptcha?: { reset(): void } }).hcaptcha?.reset();
    }
  });
}
