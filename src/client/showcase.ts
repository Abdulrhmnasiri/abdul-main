/**
 * The user-guide device. Its controls only move this demo between its own
 * screens and states: nothing is sent anywhere.
 *
 * The device is right-to-left like the original guide, so a swipe towards
 * the right advances, whatever the page language.
 */
const SWIPE_ORDER = ['procedure', 'assistant', 'support'];
const SWIPE_PX = 40;
const REPLY_MS = 650;

export function initShowcase(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const viewport = root.querySelector<HTMLElement>('.g-viewport');
  const screens = Array.from(root.querySelectorAll<HTMLElement>('[data-screen]'));
  const captions = Array.from(root.querySelectorAll<HTMLElement>('[data-caption]'));
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('.g-tabbar [data-go]'));
  if (!track || !viewport || !screens.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const ids = screens.map((s) => s.dataset.screen ?? '');
  let current = ids[0] ?? '';
  let origin = current; // where "back" returns from a screen outside the tab bar
  let assistantPlayed = false;

  // ----- Assistant: replies to the documented questions -----

  const exchanges = Array.from(root.querySelectorAll<HTMLElement>('[data-exchange]'));
  const typing = root.querySelector<HTMLElement>('[data-typing]');
  const asks = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-ask]'));
  let replyTimer = 0;

  exchanges.forEach((e) => (e.hidden = true));

  const ask = (index: number) => {
    window.clearTimeout(replyTimer);
    exchanges.forEach((e) => (e.hidden = true));
    const exchange = exchanges[index];
    const reply = exchange?.querySelector<HTMLElement>('[data-reply]');
    if (!exchange || !reply) return;
    asks.forEach((b, i) => b.classList.toggle('is-used', i === index));
    exchange.hidden = false;
    reply.hidden = true;
    const show = () => {
      if (typing) typing.hidden = true;
      reply.hidden = false;
    };
    if (reduce.matches) return show();
    if (typing) typing.hidden = false;
    replyTimer = window.setTimeout(show, REPLY_MS);
  };

  asks.forEach((button, i) => button.addEventListener('click', () => ask(i)));

  // ----- Screen navigation -----

  const go = (id: string, opts: { focusStep?: boolean; moveFocus?: boolean } = {}) => {
    const index = ids.indexOf(id);
    if (index < 0) return;
    if (!SWIPE_ORDER.includes(id) && SWIPE_ORDER.includes(current)) origin = current;
    current = id;

    track.style.setProperty('--at', String(index));
    screens.forEach((screen) => {
      const on = screen.dataset.screen === id;
      screen.classList.toggle('is-on', on);
      // Off-screen screens must not be reachable by keyboard or screen reader.
      screen.inert = !on;
    });
    captions.forEach((c) => c.classList.toggle('is-on', c.dataset.caption === id));

    const activeTab = SWIPE_ORDER.includes(id) ? id : origin;
    tabs.forEach((tab) => {
      if (tab.dataset.go === activeTab) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    });
    root.querySelectorAll('.g-steps li').forEach((li, i) => li.classList.toggle('is-focus', !!opts.focusStep && i === 0));

    if (opts.moveFocus) screens[index]?.focus({ preventScroll: true });
    if (id === 'assistant' && !assistantPlayed) {
      assistantPlayed = true;
      ask(0);
    }
  };

  // ----- Support request: validates and previews locally -----

  const form = root.querySelector<HTMLFormElement>('[data-support]');
  const preview = root.querySelector<HTMLElement>('[data-preview]');
  const error = root.querySelector<HTMLElement>('[data-error]');
  const stepper = root.querySelector<HTMLElement>('[data-stepper]');

  const setStep = (step: 'details' | 'preview') => {
    stepper?.querySelectorAll<HTMLElement>('[data-step]').forEach((li) => {
      const on = li.dataset.step === step;
      li.classList.toggle('is-on', on);
      li.classList.toggle('is-done', !on && step === 'preview' && li.dataset.step === 'details');
    });
  };

  if (form && preview) {
    const types = Array.from(form.querySelectorAll<HTMLButtonElement>('[data-type]'));
    types.forEach((button) =>
      button.addEventListener('click', () => types.forEach((b) => b.setAttribute('aria-pressed', String(b === button)))),
    );

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const subject = form.elements.namedItem('subject') as HTMLInputElement;
      const details = form.elements.namedItem('details') as HTMLTextAreaElement;
      if (!subject.value.trim()) {
        if (error) error.hidden = false;
        subject.setAttribute('aria-invalid', 'true');
        subject.focus();
        return;
      }
      if (error) error.hidden = true;
      subject.removeAttribute('aria-invalid');
      const out = (name: string, value: string) => {
        const el = preview.querySelector<HTMLElement>(`[data-out="${name}"]`);
        if (el) el.textContent = value;
      };
      out('type', types.find((b) => b.getAttribute('aria-pressed') === 'true')?.dataset.type ?? '');
      out('subject', subject.value.trim());
      out('details', details.value.trim() || '—');
      form.hidden = true;
      preview.hidden = false;
      setStep('preview');
      preview.querySelector<HTMLElement>('[data-edit]')?.focus();
    });

    preview.querySelector('[data-edit]')?.addEventListener('click', () => {
      preview.hidden = true;
      form.hidden = false;
      setStep('details');
      (form.elements.namedItem('subject') as HTMLInputElement).focus();
    });
  }

  // ----- Delegated navigation -----

  root.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('[data-back]')) return go(origin, { moveFocus: true });
    const button = target?.closest<HTMLElement>('[data-go]');
    const id = button?.dataset.go;
    if (!button || !id) return;
    const fromTabBar = !!button.closest('.g-tabbar');
    go(id, { focusStep: id === 'procedure' && !!button.closest('[data-reply]'), moveFocus: !fromTabBar });
  });

  // ----- Swipe between the tab-bar screens -----

  let startX: number | null = null;
  viewport.addEventListener('pointerdown', (e) => {
    startX = e.target instanceof Element && e.target.closest('input, textarea') ? null : e.clientX;
  });
  viewport.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) < SWIPE_PX) return;
    if (!SWIPE_ORDER.includes(current)) return go(origin);
    const next = SWIPE_ORDER[SWIPE_ORDER.indexOf(current) + (dx > 0 ? 1 : -1)];
    if (next) go(next);
  });
  viewport.addEventListener('pointercancel', () => (startX = null));

  go(current);
}
