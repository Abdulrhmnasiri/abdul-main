/**
 * The User Guide phone's walkthrough: a scripted, sanitized interface that
 * plays like a short video inside the procedure page's own video card, while
 * the numbered steps above the card tick off. It is a single deterministic timeline: every
 * frame is derived from the clock `t`, so play, pause, replay and a paused
 * first frame all share one code path. Nothing is sent or stored, and the
 * interface is a placeholder, not a recording of the production system.
 *
 * All text lives in the rendered markup; this module only moves the pointer
 * and toggles classes.
 */
const END = 24_500;

/** Pointer waypoints: either a named element in the stage or a stage fraction. */
type Spot = string | [number, number];
const PATH: Array<[number, Spot]> = [
  [0, [0.78, 0.86]],
  [1200, [0.78, 0.86]],
  [2500, 'menu'],
  [3900, 'menu'],
  [4800, 'module'],
  [6000, 'module'],
  [7600, 'new'],
  [8400, 'new'],
  [9600, 'subject'],
  [10_100, 'subject'],
  [12_400, 'subject'],
  [13_400, 'details'],
  [13_900, 'details'],
  [16_600, 'details'],
  [18_000, 'submit'],
  [19_000, 'submit'],
  [22_000, [0.7, 0.72]],
  [END, [0.7, 0.72]],
];

/** Moments the pointer presses something. */
const TAPS = [2900, 6000, 8400, 10_100, 13_900, 19_000];
const TAP_MS = 280;

const TYPE_SUBJECT: [number, number] = [10_200, 12_400];
const TYPE_DETAILS: [number, number] = [14_000, 16_400];

/** Guide steps: [start, end) of each step's time on screen. */
const STEPS: Array<[number, number]> = [
  [0, 6400],
  [6400, 8700],
  [8700, 19_000],
  [19_000, END + 1],
];
const STEP_DONE = [6400, 8700, 19_000, 19_300];

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const clamp = (x: number) => Math.min(1, Math.max(0, x));

export function initWalkthrough(root: HTMLElement): void {
  const card = root.querySelector<HTMLElement>('[data-video-open]');
  const overlay = root.querySelector<HTMLElement>('[data-walk]');
  const stage = overlay?.querySelector<HTMLElement>('[data-w-stage]');
  const pointer = overlay?.querySelector<HTMLElement>('[data-w-ptr]');
  const toggle = overlay?.querySelector<HTMLButtonElement>('[data-w-toggle]');
  const replay = overlay?.querySelector<HTMLButtonElement>('[data-w-replay]');
  const close = overlay?.querySelector<HTMLButtonElement>('[data-w-close]');
  const bar = overlay?.querySelector<HTMLElement>('[data-w-prog]');
  if (!card || !overlay || !stage || !pointer || !toggle || !replay || !close || !bar) return;

  const steps = Array.from(root.querySelectorAll<HTMLElement>('.g-steps li'));
  const typed = (name: string) => overlay.querySelector<HTMLElement>(`[data-w="${name}"] .w-typed`);
  const subjectText = typed('subject');
  const detailsText = typed('details');
  const subjectFull = subjectText?.dataset.text ?? '';
  const detailsFull = detailsText?.dataset.text ?? '';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let t = 0;
  let playing = false;
  let frame = 0;
  let last = 0;

  const el = (name: string) => stage.querySelector<HTMLElement>(`[data-w="${name}"]`);
  const on = (name: string, flag: boolean, cls = 'is-on') => el(name)?.classList.toggle(cls, flag);

  const spotXY = (spot: Spot): [number, number] => {
    const s = stage.getBoundingClientRect();
    if (typeof spot !== 'string') return [spot[0] * s.width, spot[1] * s.height];
    const target = el(spot);
    if (!target) return [s.width / 2, s.height / 2];
    const r = target.getBoundingClientRect();
    // Aim slightly inside the control so the pointer tip lands on it.
    return [r.left - s.left + r.width * 0.55, r.top - s.top + r.height * 0.55];
  };

  const place = () => {
    let i = PATH.findIndex(([at]) => at > t);
    if (i < 0) i = PATH.length - 1;
    const [t1, to] = PATH[i]!;
    const [t0, from] = PATH[Math.max(0, i - 1)]!;
    const [ax, ay] = spotXY(from);
    const [bx, by] = spotXY(to);
    const k = t1 === t0 ? 1 : ease(clamp((t - t0) / (t1 - t0)));
    // A slight arc makes the motion read as a hand, not a straight line.
    const dist = Math.hypot(bx - ax, by - ay);
    const bulge = Math.sin(Math.PI * k) * dist * 0.12;
    const nx = dist ? -(by - ay) / dist : 0;
    const ny = dist ? (bx - ax) / dist : 0;
    const x = ax + (bx - ax) * k + nx * bulge;
    const y = ay + (by - ay) * k + ny * bulge;
    pointer.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    pointer.classList.toggle('is-tap', TAPS.some((tap) => t >= tap && t < tap + TAP_MS));
  };

  const typedSlice = (full: string, [from, to]: [number, number]) =>
    full.slice(0, Math.round(full.length * clamp((t - from) / (to - from))));

  const render = () => {
    // Scenes
    const drawer = t >= 2900 && t < 6300;
    overlay.classList.toggle('is-drawer', drawer);
    overlay.dataset.scene = t >= 8700 ? 'form' : t >= 6400 ? 'list' : 'home';
    on('module', t >= 6000, 'is-pick');
    overlay.classList.toggle('is-sent', t >= 19_300);

    // Guide hints: ring the control the current step is about.
    on('menu', t < 2900, 'is-hint');
    on('module', drawer && t < 6000, 'is-hint');
    on('new', t >= 6400 && t < 8400, 'is-hint');
    on('subject', t >= 8700 && t < 18_000, 'is-hint');
    on('details', t >= 8700 && t < 18_000, 'is-hint');
    on('submit', t >= 17_500 && t < 19_000, 'is-hint');
    on('subject', t >= 10_100 && t < 13_000, 'is-focus');
    on('details', t >= 13_900 && t < 17_000, 'is-focus');

    if (subjectText) subjectText.textContent = typedSlice(subjectFull, TYPE_SUBJECT);
    if (detailsText) detailsText.textContent = typedSlice(detailsFull, TYPE_DETAILS);

    // The page's own steps: done, current, upcoming.
    steps.forEach((li, i) => {
      const [from, to] = STEPS[i]!;
      li.classList.toggle('is-done', t >= STEP_DONE[i]!);
      li.classList.toggle('is-focus', t >= from && t < to && t < STEP_DONE[i]!);
    });

    bar.style.transform = `scaleX(${clamp(t / END).toFixed(4)})`;
    place();
  };

  const setPlaying = (value: boolean) => {
    playing = value;
    overlay.classList.toggle('is-playing', value);
    toggle.setAttribute('aria-label', (value ? toggle.dataset.labelPause : toggle.dataset.labelPlay) ?? '');
    cancelAnimationFrame(frame);
    if (!value) return;
    last = performance.now();
    const tick = (now: number) => {
      // Cap the step: a throttled frame must never skip scenes in one jump.
      t = Math.min(END, t + Math.min(now - last, 250));
      last = now;
      render();
      if (t >= END) return setPlaying(false);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };

  const play = () => {
    if (t >= END) t = 0;
    setPlaying(true);
  };

  const start = () => {
    t = 0;
    render();
    // Motion-averse visitors get a paused first frame and press play themselves.
    if (reduce.matches) setPlaying(false);
    else setPlaying(true);
  };

  // The card is a plain block in the markup; with the script it becomes a
  // button. While the clip is showing it is a container for the clip's own
  // controls instead, so it must not stay a button around them.
  const armCard = (armed: boolean) => {
    if (armed) {
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
    } else {
      card.removeAttribute('role');
      card.removeAttribute('tabindex');
    }
  };

  const show = () => {
    overlay.hidden = false;
    armCard(false);
    start();
    toggle.focus({ preventScroll: true });
  };

  const hide = () => {
    setPlaying(false);
    overlay.hidden = true;
    steps.forEach((li) => li.classList.remove('is-done', 'is-focus'));
    armCard(true);
    card.focus({ preventScroll: true });
  };

  armCard(true);
  card.addEventListener('click', (event) => {
    // A click on the clip's own controls must never reopen the card it just closed.
    if (overlay.hidden && !(event.target instanceof Element && event.target.closest('.w'))) show();
  });
  card.addEventListener('keydown', (event) => {
    if (!overlay.hidden || event.target !== card) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    show();
  });

  toggle.addEventListener('click', () => (playing ? setPlaying(false) : play()));
  replay.addEventListener('click', () => {
    t = 0;
    render();
    setPlaying(true);
  });
  close.addEventListener('click', hide);
  overlay.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      hide();
    }
  });

  // Pause when the card leaves view (scrolled away, or another phone screen
  // is showing) or the tab is hidden; never resume by itself.
  new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting && playing) setPlaying(false);
    },
    { threshold: 0.5 },
  ).observe(card);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && playing) setPlaying(false);
  });
  reduce.addEventListener('change', () => reduce.matches && playing && setPlaying(false));
}
