/* ============================================================================
   EMC UI - Divider Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

@customElement('emc-divider')
export class EmcDivider extends LitElement {
  @property({ type: String }) orientation: DividerOrientation = 'horizontal';
  @property({ type: String }) variant: DividerVariant = 'solid';
  @property({ type: String }) label = '';

  static styles = css`
    :host {
      display: block;
    }

    .divider {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .divider-line {
      flex: 1;
      border: 0;
    }

    .divider-line.horizontal {
      height: 1px;
      width: 100%;
    }

    .divider-line.vertical {
      width: 1px;
      height: 100%;
      min-height: 100%;
    }

    .divider-line.solid {
      border-style: solid;
      border-color: var(--border);
    }

    .divider-line.dashed {
      border-style: dashed;
      border-color: var(--border);
    }

    .divider-line.dotted {
      border-style: dotted;
      border-color: var(--border);
    }

    .divider-label {
      padding: 0 0.75rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--fg-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .vertical {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }

    .vertical .divider-line {
      width: 1px;
      height: 100%;
    }
  `;

  render() {
    const isVertical = this.orientation === 'vertical';

    if (isVertical) {
      return html`
        <div class="divider vertical">
          ${this.label ? html`
            <span class="divider-label">${this.label}</span>
          ` : ''}
          <hr class="divider-line vertical ${this.variant}" />
        </div>
      `;
    }

    return html`
      <div class="divider">
        ${this.label ? html`
          <span class="divider-label">${this.label}</span>
        ` : ''}
        <hr class="divider-line horizontal ${this.variant}" />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-divider': EmcDivider;
  }
}