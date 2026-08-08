/* ============================================================================
   EMC UI - Event Bus
   ============================================================================ */

export type EventCallback<T = unknown> = (payload: T) => void;
type EventMap = Record<string, EventCallback[]>;

/**
 * Simple event bus for cross-component communication.
 * Used by Toast service and other cross-component communication.
 */
export class EventBus<Events extends Record<string, unknown> = Record<string, unknown>> {
  private events: EventMap = {};

  /**
   * Subscribe to an event.
   * @param event - Event name
   * @param callback - Callback function
   * @returns Unsubscribe function
   */
  on<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>): () => void {
    const eventKey = event as string;
    if (!this.events[eventKey]) {
      this.events[eventKey] = [];
    }
    this.events[eventKey]!.push(callback as EventCallback);

    return () => this.off(event, callback);
  }

  /**
   * Unsubscribe from an event.
   */
  off<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>): void {
    const callbacks = this.events[event as string];
    if (!callbacks) return;

    const index = callbacks.indexOf(callback as EventCallback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  /**
   * Emit an event to all subscribers.
   */
  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const callbacks = this.events[event as string];
    if (!callbacks) return;

    // Copy array to avoid issues if callbacks modify the array during iteration
    [...callbacks].forEach((callback) => {
      try {
        callback(payload);
      } catch (error) {
        console.error(`Error in event listener for "${String(event)}":`, error);
      }
    });
  }

  /**
   * Removes all listeners for an event.
   */
  offAll(event: keyof Events): void {
    delete this.events[event as string];
  }

  /**
   * Removes all listeners for all events.
   */
  clear(): void {
    this.events = {};
  }
}

/**
 * Global event bus instance for app-wide communication.
 * Used by Toast service and other global services.
 */
export const globalEventBus = new EventBus<{
  'toast:show': { message: string; variant?: 'info' | 'success' | 'warning' | 'error'; duration?: number };
  'toast:hide': string;
  'theme:change': 'light' | 'dark';
}>();

/**
 * Creates a typed event bus for a specific component or feature.
 */
export function createEventBus<Events extends Record<string, unknown>>(): EventBus<Events> {
  return new EventBus<Events>();
}

/**
 * Hook-like function for subscribing to events in a component.
 * Returns an unsubscribe function.
 */
export function useEventBus<Events extends Record<string, unknown>>(
  bus: EventBus<Events>,
  event: keyof Events,
  callback: EventCallback<Events[keyof Events]>
): () => void {
  return bus.on(event, callback);
}