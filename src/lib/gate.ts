import type { GateStop } from '../content/types.ts';

export const GATE_NODES = ['confirm', 'source', 'claim', 'stored'] as const;
export type GateNode = (typeof GATE_NODES)[number];
export type NodeState = 'pass' | 'block' | 'skip';

/**
 * State of every node for a statement that stops at `stop`: nodes before
 * the stop pass, the stop itself blocks, and anything after is never reached.
 * A statement that reaches `stored` passes everything.
 */
export function gateStates(stop: GateStop): Record<GateNode, NodeState> {
  const blockedAt = stop === 'stored' ? GATE_NODES.length : GATE_NODES.indexOf(stop);
  return Object.fromEntries(
    GATE_NODES.map((node, i) => [node, i < blockedAt ? 'pass' : i === blockedAt ? 'block' : 'skip']),
  ) as Record<GateNode, NodeState>;
}
