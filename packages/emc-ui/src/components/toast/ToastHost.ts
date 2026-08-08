/* ============================================================================
   EMC UI - Toast Host Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('emc-toast-host')
export class EmcToastHost extends LitElement {
  @property({ type: String }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right';
  @state() private toasts: Array<{ id: string; element: HTMLElement }> = [];

  static styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 9999;
      pointer-events: none;
    }

    .toast-host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      pointer-events: none;
      max-width: 420px;
    }

    .toast-host.top-right {
      top: 1rem;
      right: 1rem;
    }

    .toast-host.top-left {
      top: 1rem;
      left: 1rem;
    }

    .toast-host.bottom-right {
      bottom: 1rem;
      right: 1rem;
    }

    .toast-host.bottom-left {
      bottom: 1rem;
      left: 1rem;
    }

    .toast-host * {
      pointer-events: auto;
    }
  `;

  addToast(toast: { id: string; element: HTMLElement }) {
    this.toasts = [...this.toasts, toast];
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  render() {
    return html`
      <div class="toast-host ${this.position}" role="region" aria-live="polite" aria-label="Notificaciones">
        ${this.toasts.map(t => t.element)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-toast-host': EmcToastHost;
  }
}