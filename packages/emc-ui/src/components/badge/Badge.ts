/* ============================================================================
   EMC UI - Badge Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type BadgeVariant = 'default' | 'brand' | 'green' | 'amber' | 'gray';

@customElement('emc-badge')
export class EmcBadge extends LitElement {
  @property({ type: String }) variant: BadgeVariant = 'default';

  static styles = css`
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      white-space: nowrap;
      border-radius: 9999px;
      padding: 0.125rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .badge-default {
      background-color: var(--surface-2);
      color: var(--fg);
    }

    .badge-brand {
      background-color: color-mix(in srgb, var(--color-brand-500) 10%, transparent);
      color: var(--color-brand-700);
    }

    .badge-green {
      background-color: color-mix(in srgb, #10b981 10%, transparent);
      color: #047857;
    }

    .badge-amber {
      background-color: color-mix(in srgb, #f59e0b 10%, transparent);
      color: #b45309;
    }

    .badge-gray {
      background-color: color-mix(in srgb, #64748b 10%, transparent);
      color: #475569;
    }

    @media (prefers-color-scheme: dark) {
      .badge-brand {
        color: var(--color-brand-300);
      }
      .badge-green {
        color: #6ee7b7;
      }
      .badge-amber {
        color: #fcd34d;
      }
      .badge-gray {
        color: #94a3b8;
      }
    }
  `;

  render() {
    const variantClass = this.variant ? `badge-${this.variant}` : 'badge-default';

    return html`
      <span class="badge ${variantClass}">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-badge': EmcBadge;
  }
}