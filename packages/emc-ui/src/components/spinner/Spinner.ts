/* ============================================================================
   EMC UI - Spinner Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('emc-spinner')
export class EmcSpinner extends LitElement {
  @property({ type: Number }) size = 16;
  @property({ type: String }) color = 'var(--color-brand-500)';
  @property({ type: String }) strokeWidth = '2';

  static styles = css`
    :host {
      display: inline-flex;
    }

    .spinner {
      animation: spin 1s linear infinite;
      color: var(--spinner-color, var(--color-brand-500));
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    const style = `width: ${this.size}px; height: ${this.size}px; stroke-width: ${this.strokeWidth}; color: ${this.color};`;

    return html`
      <svg class="spinner" viewBox="0 0 24 24" fill="none" style="${style}" aria-hidden="true">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-spinner': EmcSpinner;
  }
}
