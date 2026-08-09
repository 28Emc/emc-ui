import type { ReactiveElement } from 'lit';

/**
 * Awaits Lit's next render cycle for the given element.
 */
export async function flush(el: ReactiveElement): Promise<void> {
  await el.updateComplete;
}
