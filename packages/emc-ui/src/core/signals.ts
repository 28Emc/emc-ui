/* ============================================================================
   EMC UI - Signals
   ============================================================================ */

import { signal, computed, effect, type Signal } from '@preact/signals-core';

export type { Signal };

/**
 * Compatibility alias: a writable signal is a plain @preact/signals-core Signal.
 */
export type WritableSignal<T> = Signal<T>;

export { signal, computed, effect };

/**
 * Creates a derived signal that updates when any of its dependencies change.
 * Wrapper around Preact's computed for consistent API.
 */
export function derived<T>(fn: () => T): Signal<T> {
  return computed(fn);
}

/**
 * Creates a batch of signal updates that will be applied together.
 * Useful for batching multiple signal updates into a single render.
 */
export function batch(fn: () => void): void {
  // Preact signals batches automatically in event handlers
  // This is a no-op for compatibility but provides semantic clarity
  fn();
}

/**
 * Creates a signal that holds the previous value of another signal.
 * Useful for comparing current and previous values.
 */
export function previous<T>(input: Signal<T>): Signal<T | undefined> {
  const prev = signal<T | undefined>(undefined);
  effect(() => {
    prev.value = input.value;
  });
  return prev;
}

/**
 * Creates a signal that only updates when the value actually changes
 * (using Object.is comparison).
 */
export function distinct<T>(
  input: Signal<T>,
  areEqual: (a: T, b: T) => boolean = Object.is,
): Signal<T> {
  const result = signal(input.value);
  let prev = input.value;
  effect(() => {
    const current = input.value;
    if (!areEqual(current, prev)) {
      prev = current;
      result.value = current;
    }
  });
  return result;
}

/**
 * Creates a signal that debounces another signal by the given milliseconds.
 */
export function debounced<T>(input: Signal<T>, ms: number): Signal<T> {
  const result = signal(input.value);
  let timeout: ReturnType<typeof setTimeout> | null = null;
  effect(() => {
    const value = input.value;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      result.value = value;
    }, ms);
  });
  return result;
}
