/* ============================================================================
   EMC UI - Popover Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

@customElement('emc-popover')
export class EmcPopover extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @property({ type: String }) align: 'start' | 'center' | 'end' = 'center';
  @property({ type: String }) minWidth = '16rem';
  @property({ type: String }) ariaLabel = 'Popover';
  @property({ type: Boolean }) open = false;

  @state() private popoverX = 0;
  @state() private popoverY = 0;

  private cleanup: (() => void) | null = null;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .popover-trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
    }

    .popover {
      position: fixed;
      z-index: 9999;
      min-width: 16rem;
      max-width: calc(100vw - 2rem);
      padding: 1rem;
      background-color: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl, 0.75rem);
      box-shadow: var(--shadow-pop);
      animation: scale-in 0.18s ease-out;
    }

    @keyframes scale-in {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .popover-content {
      padding: 1rem;
    }

    .popover-arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      transform: rotate(45deg);
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    if (this.open) {
      this.openPopover();
    }
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown);
    this.cleanup?.();
  }

  protected async openPopover() {
    this.open = true;
    await this.updateComplete;
    await this.position();
  }

  protected closePopover() {
    this.open = false;
    this.cleanup?.();
    this.cleanup = null;
  }

  protected async position() {
    const { autoUpdate, computePosition, flip, shift, offset } = await import('@floating-ui/dom');
    const popoverEl = this.renderRoot.querySelector('.popover') as HTMLElement | null;
    if (!popoverEl) return;

    this.cleanup?.();
    this.cleanup =
      (await autoUpdate(
        this,
        popoverEl,
        async () => {
          const { x, y, placement } = await computePosition(this, popoverEl, {
            placement: this.placement,
            strategy: 'fixed',
            middleware: [offset(8), flip(), shift({ padding: 8 })],
          });

          this.popoverX = x;
          this.popoverY = y;
          popoverEl.style.left = `${x}px`;
          popoverEl.style.top = `${y}px`;
          popoverEl.setAttribute('data-placement', placement);
        },
        { ancestorScroll: true, ancestorResize: true },
      )) ?? null;
  }

  protected toggle() {
    if (this.open) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  protected handleTriggerClick() {
    if (this.open) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  protected handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closePopover();
    }
  }

  protected handleDocumentPointerDown = (event: Event) => {
    if (this.open && !event.composedPath().includes(this)) {
      this.closePopover();
    }
  };

  render() {
    return html`
      <button
        class="popover-trigger"
        @click="${this.handleTriggerClick}"
        @keydown="${this.handleKeyDown}"
        aria-expanded="${this.open}"
        aria-haspopup="dialog"
        aria-label="${this.ariaLabel}"
      >
        <slot name="trigger">${this.label}</slot>
        <slot name="trigger-icon">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>
      </button>

      ${
        this.open
          ? html`
              <div
                class="popover"
                style="left: ${this.popoverX}px; top: ${this.popoverY}px;"
                role="dialog"
                aria-label="${this.ariaLabel}"
                @click="${(e: Event) => e.stopPropagation()}"
              >
                <slot></slot>
              </div>
            `
          : ''
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-popover': EmcPopover;
  }
}
