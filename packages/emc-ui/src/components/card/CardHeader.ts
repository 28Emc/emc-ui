/* ============================================================================
   EMC UI - Card Header Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('emc-card-header')
export class EmcCardHeader extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';

  static styles = css`
    :host {
      display: block;
    }

    .header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border);
    }

    .title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--fg);
      margin: 0;
    }

    .subtitle {
      font-size: 0.875rem;
      color: var(--fg-muted);
      margin: 0.25rem 0 0 0;
    }

    .actions {
      margin-top: 1rem;
    }
  `;

  render() {
    return html`
      <header class="header">
        <div>
          <h3 class="title">${this.title}</h3>
          ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : ''}
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-card-header': EmcCardHeader;
  }
}