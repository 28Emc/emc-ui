/* ============================================================================
   EMC UI - Tab Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('emc-tab')
export class EmcTab extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: contents;
    }
  `;

  render() {
    return html`
      <button
        role="tab"
        aria-selected="false"
        aria-controls=""
        id=""
        ?disabled=${this.disabled}
        part="tab"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-tab': EmcTab;
  }
}
