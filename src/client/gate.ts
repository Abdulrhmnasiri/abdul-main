import type { GateStop } from '../content/types.ts';
import { GATE_NODES, gateStates } from '../lib/gate.ts';

const STEP_MS = 320;

/**
 * Runs the selected statement through the pipeline one node at a time, so
 * the visitor sees where it passes and exactly where it is stopped.
 */
export function initGate(root: HTMLElement): void {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-gate-example]'));
  const nodes = new Map(
    Array.from(root.querySelectorAll<HTMLElement>('[data-node]')).map((n) => [n.dataset.node ?? '', n]),
  );
  const outcomes = Array.from(root.querySelectorAll<HTMLElement>('[data-outcome]'));
  const instant = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers: number[] = [];

  const run = (button: HTMLButtonElement) => {
    const id = button.dataset.gateExample;
    const states = gateStates(button.dataset.stop as GateStop);
    timers.forEach(clearTimeout);
    timers = [];

    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    outcomes.forEach((o) => o.classList.remove('is-on'));
    nodes.forEach((n) => (n.dataset.state = 'idle'));

    let delay = 0;
    for (const node of GATE_NODES) {
      const state = states[node];
      if (state === 'skip') {
        nodes.get(node)!.dataset.state = 'skip';
        continue;
      }
      const apply = () => (nodes.get(node)!.dataset.state = state);
      if (instant) apply();
      else timers.push(window.setTimeout(apply, (delay += STEP_MS)));
    }
    const reveal = () => outcomes.find((o) => o.dataset.outcome === id)?.classList.add('is-on');
    if (instant) reveal();
    else timers.push(window.setTimeout(reveal, delay + STEP_MS / 2));
  };

  buttons.forEach((b) => b.addEventListener('click', () => run(b)));
}
