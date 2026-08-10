import { expect } from 'vitest';
import { run, type Result } from 'axe-core';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

export interface A11yViolation {
  id: string;
  impact: Result['impact'];
  help: string;
  nodes: string[];
}

export async function getViolations(node: string | Element): Promise<A11yViolation[]> {
  const results = await run(node, {
    runOnly: { type: 'tag', values: WCAG_TAGS },
  });
  return results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.map((n) => n.target.join(' ')),
  }));
}

export function formatViolations(violations: A11yViolation[]): string {
  return violations
    .map((v) => `  - ${v.id} (${v.impact ?? 'n/a'}): ${v.help} @ ${v.nodes.join(', ')}`)
    .join('\n');
}

export async function expectNoViolations(node: string | Element, label: string): Promise<void> {
  const violations = await getViolations(node);
  expect(
    violations,
    `${label} should have no a11y violations\n${formatViolations(violations)}`,
  ).toEqual([]);
}
