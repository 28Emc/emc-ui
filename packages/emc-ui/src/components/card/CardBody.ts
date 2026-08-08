/* ============================================================================
   EMC UI - Card Body Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('emc-card-body')
export class EmcCardBody extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .body {
      padding: 1.5rem;
    }
  `;

  render() {
    return html`
      <div class="body">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-card-body': EmcCardBody;
  }
}
