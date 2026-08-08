/* ============================================================================
   EMC UI - Tooltip Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@customElement('emc-tooltip')
export class EmcTooltip extends LitElement {
  @property({ type: String }) content = '';
  @property({ type: String }) placement: TooltipPlacement = 'top';
  @property({ type: Boolean }) open = false;
  @property({ type: Number }) delay = 200;
  @property({ type: Boolean }) interactive = false;

  @state() private tooltipOpen = false;
  @state() private tooltipX = 0;
  @state() private tooltipY = 0;

  private cleanup: (() => void) | null = null;
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private floatingEl: HTMLElement | null = null;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .tooltip-trigger {
      display: inline-block;
    }

    .tooltip {
      position: fixed;
      z-index: 9999;
      max-width: 280px;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--surface);
      background-color: var(--fg);
      border-radius: var(--radius-xl, 0.75rem);
      box-shadow: var(--shadow-pop);
      white-space: normal;
      word-wrap: break-word;
      opacity: 0;
      transform: scale(0.95);
      transition:
        opacity 150ms ease-out,
        transform 150ms ease-out;
      pointer-events: none;
    }

    .tooltip.visible {
      opacity: 1;
      transform: translate(-50%, 0) scale(1);
    }

    .tooltip[data-placement='top'] {
      bottom: calc(100% + 8px);
      left: 50%;
      transform-origin: bottom center;
    }

    .tooltip[data-placement='bottom'] {
      top: calc(100% + 8px);
      left: 50%;
      transform-origin: top center;
    }

    .tooltip[data-placement='left'] {
      right: calc(100% + 8px);
      top: 50%;
      transform-origin: center right;
    }

    .tooltip[data-placement='right'] {
      left: calc(100% + 8px);
      top: 50%;
      transform-origin: center left;
    }

    .tooltip.visible {
      opacity: 1;
      transform: translate(-50%, 0) scale(1);
    }

    .tooltip[data-placement='top'].visible {
      transform: translate(-50%, calc(-100% - 8px)) scale(1);
    }

    .tooltip[data-placement='bottom'].visible {
      transform: translate(-50%, 8px) scale(1);
    }

    .tooltip[data-placement='left'].visible {
      transform: translate(calc(-100% - 8px), -50%) scale(1);
    }

    .tooltip[data-placement='right'].visible {
      transform: translate(8px, -50%) scale(1);
    }

    .tooltip-content {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--surface);
      line-height: 1.4;
    }

    .tooltip-arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
    }

    .tooltip[data-placement='top'] .tooltip-arrow {
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }

    .tooltip[data-placement='bottom'] .tooltip-arrow {
      top: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }

    .tooltip[data-placement='left'] .tooltip-arrow {
      right: -4px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }

    .tooltip[data-placement='right'] .tooltip-arrow {
      left: -4px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    this.updateTooltipPosition();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanup?.();
    if (this.showTimeout) clearTimeout(this.showTimeout);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }

  protected async updateTooltipPosition() {
    if (!this.floatingEl || !this.content) return;

    const { computePosition, flip, shift, offset, autoUpdate } = await import('@floating-ui/dom');

    this.cleanup?.();
    this.cleanup = autoUpdate(
      this,
      this.renderRoot.querySelector('.tooltip') as HTMLElement,
      async () => {
        const { x, y, placement } = await computePosition(this, this.floatingEl!, {
          placement: this.placement,
          strategy: 'fixed',
          middleware: [offset(8), flip(), shift({ padding: 8 })],
        });

        this.tooltipX = x;
        this.tooltipY = y;
        this.floatingEl!.style.left = `${x}px`;
        this.floatingEl!.style.top = `${y}px`;
        this.floatingEl!.setAttribute('data-placement', placement);
      },
      { ancestorScroll: true, ancestorResize: true },
    );
  }

  protected show() {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => {
      this.tooltipOpen = true;
      this.updateTooltipPosition();
    }, this.delay);
  }

  protected hide() {
    if (this.showTimeout) clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.tooltipOpen = false;
    }, 100);
  }

  handleMouseEnter() {
    this.show();
  }

  handleMouseLeave() {
    this.hide();
  }

  handleFocusIn() {
    this.show();
  }

  handleFocusOut() {
    this.hide();
  }

  render() {
    return html`
      <span
        class="tooltip-trigger"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
        @focusin="${this.handleFocusIn}"
        @focusout="${this.handleFocusOut}"
      >
        <slot></slot>
      </span>

      ${
        this.tooltipOpen
          ? html`
              <div
                class="tooltip"
                data-placement="${this.placement}"
                style="left: ${this.tooltipX}px; top: ${this.tooltipY}px;"
                role="tooltip"
                aria-hidden="false"
              >
                <span class="tooltip-content">${this.content}</span>
                <span class="tooltip-arrow"></span>
              </div>
            `
          : ''
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-tooltip': EmcTooltip;
  }
}
