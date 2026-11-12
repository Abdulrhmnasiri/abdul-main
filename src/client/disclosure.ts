const DURATION = 280;
const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * Animates native <details> rows open and closed. The browser toggles
 * `open` instantly, so the click is intercepted: `open` is set first when
 * opening and only cleared after the close animation, and the panel height
 * is animated in between. Reduced-motion visitors keep the native toggle.
 */
export function initDisclosures(): void {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  for (const details of document.querySelectorAll<HTMLDetailsElement>('details[data-animate]')) {
    const summary = details.querySelector('summary');
    const panel = details.querySelector<HTMLElement>('.row-panel');
    if (!summary || !panel) continue;

    let animation: Animation | undefined;
    let closing = false;

    const play = (from: number, to: number, done: () => void) => {
      animation?.cancel();
      panel.style.overflow = 'hidden';
      const growing = to > from;
      const run = panel.animate(
        { height: [`${from}px`, `${to}px`], opacity: [growing ? 0 : 1, growing ? 1 : 0] },
        { duration: DURATION, easing: EASING, fill: 'forwards' },
      );
      animation = run;

      let settled = false;
      const settle = () => {
        if (settled || animation !== run) return; // already done, or replaced by a newer animation
        settled = true;
        done();
        run.cancel();
        panel.style.overflow = '';
        animation = undefined;
      };
      run.onfinish = settle;
      // Browsers pause animation frames in hidden or background tabs. The
      // open state must not depend on them, so a timer settles it as well.
      window.setTimeout(settle, DURATION + 80);
    };

    const open = () => {
      // Resuming mid-close continues from the current height.
      const from = animation ? panel.offsetHeight : 0;
      closing = false;
      details.classList.remove('is-closing');
      details.open = true;
      play(from, panel.scrollHeight, () => {});
    };

    const close = () => {
      closing = true;
      details.classList.add('is-closing');
      play(panel.offsetHeight, 0, () => {
        details.open = false;
        details.classList.remove('is-closing');
        closing = false;
      });
    };

    summary.addEventListener('click', (event) => {
      if (reduce.matches) return;
      event.preventDefault();
      if (details.open && !closing) close();
      else open();
    });
  }
}
