/**
 * The Career Advisor phone replays a recorded advisor response, then lets
 * the visitor act on the proposed wording. The phone shows the product's
 * documented rule: nothing is stored until the candidate confirms, and the
 * next stage stays locked until then. Only the demo's own state changes.
 */
const TYPING_MS = 650;
const PAUSE_MS = 450;

export function initConsult(root: HTMLElement): void {
  const q = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
  const beats = Array.from(root.querySelectorAll<HTMLElement>('[data-beat]'));
  const stages = Array.from(root.querySelectorAll<HTMLElement>('[data-stage]'));
  const captions = Array.from(root.querySelectorAll<HTMLElement>('[data-caption]'));
  const body = q('[data-body]');
  const typing = q('[data-typing]');
  const actions = q('[data-actions]');
  const hint = q('[data-hint]');
  const result = q('[data-result]');
  const resultTitle = q('[data-result-title]');
  const resultBody = q('[data-result-body]');
  const resultNext = q('[data-result-next]');
  const wording = q('[data-wording]');
  const field = q<HTMLTextAreaElement>('[data-field]');
  const editButton = q<HTMLButtonElement>('[data-edit-btn]');
  const nextButton = q<HTMLButtonElement>('[data-next]');
  if (!body || !typing || !actions || !hint || !result || !wording || !field || !editButton || !nextButton) return;
  if (!resultTitle || !resultBody || !resultNext) return;

  const ui = root.dataset;
  const original = wording.textContent ?? '';
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers: number[] = [];
  let text = original;
  let editing = false;

  const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

  const setStage = (active: number, flag?: 'rejected') => {
    stages.forEach((li) => {
      const i = Number(li.dataset.stage);
      li.classList.toggle('is-done', i < active);
      li.classList.toggle('is-on', i === active);
      li.classList.toggle('is-rejected', flag === 'rejected' && i === active);
    });
  };
  const setCaption = (id: string) => captions.forEach((c) => c.classList.toggle('is-on', c.dataset.caption === id));
  const say = (message: string) => {
    hint.textContent = message;
    hint.hidden = !message;
  };

  const setEditing = (on: boolean) => {
    editing = on;
    root.toggleAttribute('data-editing', on);
    field.hidden = !on;
    wording.hidden = on;
    editButton.textContent = (on ? ui.uiCancel : ui.uiEdit) ?? '';
    if (on) {
      field.value = text;
      field.focus({ preventScroll: true });
      // Focusing puts the caret at the end and scrolls there; start at the top.
      field.setSelectionRange(0, 0);
      field.scrollTop = 0;
    } else {
      wording.textContent = text;
    }
    say('');
  };

  const reset = () => {
    timers.forEach(clearTimeout);
    timers = [];
    text = original;
    wording.textContent = original;
    setEditing(false);
    delete root.dataset.state;
    beats.forEach((b, i) => (b.hidden = i > 0));
    typing.hidden = true;
    actions.hidden = true;
    result.hidden = true;
    body.hidden = false;
    nextButton.disabled = false;
    nextButton.setAttribute('aria-disabled', 'true');
    nextButton.classList.remove('is-open');
    say('');
    setStage(0);
    setCaption('understand');
  };

  /** Reveals each recorded beat after a short typing indicator. */
  const play = () => {
    reset();
    const reveal = (index: number, caption: string, stage: number) => () => {
      typing.hidden = true;
      const beat = beats[index];
      if (beat) beat.hidden = false;
      body.scrollTop = body.scrollHeight;
      setStage(stage);
      setCaption(caption);
    };
    const showActions = () => {
      actions.hidden = false;
      setStage(2);
      setCaption('confirm');
    };
    const steps: Array<[number, string, number]> = [
      [1, 'understand', 0],
      [2, 'wording', 1],
      [3, 'wording', 1],
    ];

    if (reduce()) {
      steps.forEach(([i, c, s]) => reveal(i, c, s)());
      return showActions();
    }
    let at = 0;
    steps.forEach(([i, c, s]) => {
      later((at += PAUSE_MS), () => (typing.hidden = false));
      later((at += TYPING_MS), reveal(i, c, s));
    });
    later((at += PAUSE_MS), showActions);
  };

  const finish = (kind: 'saved' | 'rejected') => {
    body.hidden = true;
    actions.hidden = true;
    say('');
    result.hidden = false;
    root.dataset.state = kind;
    if (kind === 'saved') {
      resultTitle.textContent = ui.uiSaved ?? '';
      resultBody.textContent = text;
      resultNext.textContent = ui.uiOpen ?? '';
      nextButton.setAttribute('aria-disabled', 'false');
      nextButton.classList.add('is-open');
      nextButton.disabled = true; // the stage is open; nothing further to do in this demo
      setStage(3);
    } else {
      resultTitle.textContent = ui.uiRejected ?? '';
      resultBody.textContent = ui.uiRejectedNote ?? '';
      resultNext.textContent = ui.uiLocked ?? '';
      setStage(2, 'rejected');
    }
    setCaption(kind);
    result.focus({ preventScroll: true });
  };

  actions.addEventListener('click', (event) => {
    const act = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-act]')?.dataset.act : undefined;
    if (act === 'edit') return setEditing(!editing);
    if (act === 'reject') return finish('rejected');
    if (act !== 'confirm') return;
    const next = (editing ? field.value : text).trim();
    if (!next) return say(ui.uiEmpty ?? '');
    text = next;
    finish('saved');
  });

  // Tapping the locked stage explains why it is locked.
  nextButton.addEventListener('click', () => {
    if (nextButton.getAttribute('aria-disabled') === 'true') say(ui.uiLocked ?? '');
  });

  result.querySelector('[data-replay]')?.addEventListener('click', () => {
    play();
    body.focus({ preventScroll: true });
  });

  reset();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        play();
      },
      { threshold: 0.55 },
    );
    observer.observe(root);
  } else {
    play();
  }
}
