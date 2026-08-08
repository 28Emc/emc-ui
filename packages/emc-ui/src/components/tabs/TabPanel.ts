/* ============================================================================
   EMC UI - Tab Panel Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('emc-tab-panel')
export class EmcTabPanel extends LitElement {
  @property({ type: String }) label = '';

  static styles = css`
    :host {
      display: none;
    }

    :host([data-active]) {
      display: block;
      animation: fade-in 0.2s ease-out;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  @property({ type: Boolean, reflect: true }) active = false;

  static get observedAttributes() {
    return ['data-active'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data-active') {
      this.hidden = newValue !== 'true';
    }
  }

  render() {
    return html`
      <div role="tabpanel" part="panel">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-tab-panel': EmcTabPanel;
  }
}
