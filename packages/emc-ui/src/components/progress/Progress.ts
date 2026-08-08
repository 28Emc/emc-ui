/* ============================================================================
   EMC UI - Progress Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ProgressSize = 'sm' | 'md' | 'lg';

@customElement('emc-progress')
export class EmcProgress extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) size: ProgressSize = 'md';
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: String }) label = '';
  @property({ type: String }) color = 'var(--color-brand-500)';

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .progress {
      width: 100%;
      background-color: var(--surface-2);
      border-radius: 9999px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background-color: var(--progress-color, var(--color-brand-500));
      border-radius: inherit;
      transition: width 0.3s ease-out, background-color 0.3s ease;
    }

    .progress-indeterminate .progress-bar {
      animation: progress-indeterminate 1.5s ease-in-out infinite;
      width: 30% !important;
    }

    @keyframes progress-indeterminate {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .progress-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--fg);
    }

    .progress-value {
      color: var(--fg-muted);
      font-variant-numeric: tabular-nums;
    }

    .size-sm {
      height: 4px;
    }

    .size-md {
      height: 8px;
    }

    .size-lg {
      height: 12px;
    }
  `;

  protected get percentage(): number {
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  render() {
    const sizeClass = `size-${this.size}`;

    return html`
      ${this.label ? html`
        <div class="progress-label">
          <span>${this.label}</span>
          <span class="progress-value">${this.indeterminate ? '—' : `${Math.round(this.percentage)}%`}</span>
        </div>
      ` : ''}
      <div class="progress ${this.indeterminate ? 'progress-indeterminate' : ''}">
        <div
          class="progress-bar ${this.size}"
          style="width: ${this.indeterminate ? '30%' : `${this.percentage}%`}; background-color: ${this.color};"
          role="progressbar"
          aria-valuenow="${this.indeterminate ? '0' : this.percentage}"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="${this.label || 'Progress'}"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-progress': EmcProgress;
  }
}