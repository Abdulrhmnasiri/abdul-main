/**
 * The user-guide device. Its controls only move this demo between its own
 * screens and states: nothing is sent anywhere.
 *
 * The device follows the page direction: a swipe towards the right advances
 * in Arabic (right-to-left), towards the left in English.
 */
const SWIPE_ORDER = ['procedure', 'assistant', 'support'];
const SWIPE_PX = 40;
const REPLY_MS = 650;

export function initShowcase(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const viewport = root.querySelector<HTMLElement>('.g-viewport');
  const screens = Array.from(root.querySelectorAll<HTMLElement>('[data-screen]'));
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('.g-tabbar [data-go]'));
  if (!track || !viewport || !screens.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const rtl = root.querySelector('.device-screen')?.getAttribute('dir') === 'rtl';
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
    const forward = rtl ? dx > 0 : dx < 0;
    const next = SWIPE_ORDER[SWIPE_ORDER.indexOf(current) + (forward ? 1 : -1)];
    if (next) go(next);
  });
  viewport.addEventListener('pointercancel', () => (startX = null));

  go(current);
  initAutoplay();

  // ----- Guided preview: a short, quiet loop until the visitor takes over -----

  function initAutoplay(): void {
    const cursor = root.querySelector<HTMLElement>('[data-cursor]');
    const screen = root.querySelector<HTMLElement>('.device-screen');
    if (!cursor || !screen || reduce.matches) return;

    const q = (selector: string) => root.querySelector<HTMLElement>(selector);
    const steps: Array<{ target: string; act: () => void; wait: number }> = [
      { target: '.g-tabbar [data-go="assistant"]', act: () => go('assistant'), wait: 2200 },
      { target: '[data-ask="1"]', act: () => ask(1), wait: 1900 },
      { target: '[data-exchange="1"] .g-dest', act: () => go('permissions'), wait: 1800 },
      { target: '[data-back]', act: () => go('assistant'), wait: 900 },
      { target: '.g-tabbar [data-go="support"]', act: () => go('support'), wait: 2200 },
      { target: '.g-tabbar [data-go="procedure"]', act: () => go('procedure'), wait: 2000 },
    ];

    let index = 0;
    let timer = 0;
    let visible = false;
    let stopped = false;

    const moveTo = (el: HTMLElement) => {
      const a = screen.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      const x = b.left - a.left + b.width / 2;
      const y = b.top - a.top + b.height / 2;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
    };

    const tick = () => {
      if (stopped || !visible) return;
      const step = steps[index % steps.length]!;
      const el = q(step.target);
      if (!el) {
        index = 0;
        return void (timer = window.setTimeout(tick, 1000));
      }
      cursor.classList.add('is-on');
      moveTo(el);
      timer = window.setTimeout(() => {
        cursor.classList.add('is-tap');
        step.act();
        window.setTimeout(() => cursor.classList.remove('is-tap'), 260);
        index += 1;
        timer = window.setTimeout(tick, step.wait);
      }, 900);
    };

    const stop = () => {
      stopped = true;
      window.clearTimeout(timer);
      cursor.classList.remove('is-on', 'is-tap');
    };

    root.addEventListener('pointerdown', stop, { once: true });
    root.addEventListener('keydown', stop, { once: true });
    root.addEventListener('focusin', stop, { once: true });
    reduce.addEventListener('change', () => reduce.matches && stop());

    new IntersectionObserver(
      ([entry]) => {
        const was = visible;
        visible = !!entry?.isIntersecting && !document.hidden;
        if (visible && !was) timer = window.setTimeout(tick, 1600);
        else if (!visible) window.clearTimeout(timer);
      },
      { threshold: 0.6 },
    ).observe(root);
  }
}
