/* ============================================================================
   EMC UI - StatCard Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type StatCardAccent = 'brand' | 'green' | 'amber' | 'pink';

@customElement('emc-stat-card')
export class EmcStatCard extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) sublabel = '';
  @property({ type: String }) icon = '';
  @property({ type: String }) accent: 'brand' | 'green' | 'amber' | 'pink' = 'brand';

  static styles = css`
    :host {
      display: block;
    }

    .stat-card {
      border-radius: var(--radius-2xl, 1.125rem);
      border: 1px solid var(--border);
      background-color: var(--surface);
      padding: 1.5rem;
      box-shadow: var(--shadow-soft);
    }

    .stat-card-content {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
    }

    .stat-card-info {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      min-width: 0;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--fg-muted);
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--fg);
      line-height: 1.2;
    }

    .stat-sublabel {
      font-size: 0.75rem;
      color: var(--fg-muted);
    }

    .stat-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: var(--radius-xl, 0.75rem);
      flex-shrink: 0;
    }

    .icon-brand {
      background-color: color-mix(in srgb, var(--color-brand-500) 10%, transparent);
      color: var(--color-brand-700);
    }

    .icon-green {
      background-color: color-mix(in srgb, #10b981 10%, transparent);
      color: #047857;
    }

    .icon-amber {
      background-color: color-mix(in srgb, #f59e0b 10%, transparent);
      color: #b45309;
    }

    .icon-pink {
      background-color: color-mix(in srgb, #ec4899 10%, transparent);
      color: #be185d;
    }

    @media (prefers-color-scheme: dark) {
      .icon-brand {
        color: var(--color-brand-300);
      }
    }
  `;

  protected getIconClass(): string {
    const base = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl';
    const accentClass =
      {
        brand: 'icon-brand',
        green: 'icon-green',
        amber: 'icon-amber',
        pink: 'icon-pink',
      }[this.accent] || 'icon-brand';
    return `${base} ${accentClass}`;
  }

  render() {
    return html`
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-info">
            <p class="stat-label">${this.label}</p>
            <p class="stat-value">${this.value}</p>
            ${this.sublabel ? html`<p class="stat-sublabel">${this.sublabel}</p>` : ''}
          </div>
          ${
            this.icon
              ? html`
                  <span class="${this.getIconClass()}">
                    <slot name="icon"></slot>
                  </span>
                `
              : ''
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-stat-card': EmcStatCard;
  }
}
