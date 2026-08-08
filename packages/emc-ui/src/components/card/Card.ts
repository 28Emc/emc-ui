/* ============================================================================
   EMC UI - Card Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('emc-card')
export class EmcCard extends LitElement {
  @property({ type: Boolean }) hover = false;

  static styles = css`
    :host {
      display: block;
    }

    .card {
      border-radius: var(--radius-2xl, 1.125rem);
      border: 1px solid var(--border);
      background-color: var(--surface);
      color: var(--fg);
      box-shadow: var(--shadow-soft);
    }

    .card:hover {
      transform: translateY(-0.125rem);
      box-shadow: var(--shadow-card);
    }

    .card.hover-enabled {
      transition: transform 150ms ease-out, box-shadow 150ms ease-out;
    }
  `;

  render() {
    const classes = ['card'];
    if (this.hover) {
      this.classList.add('hover-enabled');
    }

    return html`
      <div class="${this.hover ? 'card hover-enabled' : 'card'}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-card': EmcCard;
  }
}