/* ============================================================================
   EMC UI - Button Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-soft',
  secondary: 'border border-default bg-surface text-fg hover:bg-surface-2',
  ghost: 'text-fg hover:bg-surface-2',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  outline:
    'border border-brand-500 text-brand-600 hover:bg-brand-50 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-500/10',
  subtle: 'bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-300',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-6 text-base',
  icon: 'h-10 w-10',
  'icon-sm': 'h-8 w-8',
};

@customElement('emc-button')
export class EmcButton extends LitElement {
  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: String }) size: ButtonSize = 'md';
  @property({ type: Boolean, attribute: 'loading' }) loading = false;
  @property({ type: Boolean, attribute: 'disabled' }) disabled = false;
  @property({ type: String }) ariaLabel = '';
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  @state() private _focusVisible = false;

  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--gap, 0.5rem);
      border: none;
      border-radius: var(--radius-xl, 0.75rem);
      font-family: var(--font-sans, inherit);
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      transition:
        background-color 150ms,
        color 150ms,
        border-color 150ms,
        box-shadow 150ms,
        filter 150ms,
        transform 150ms;
      outline: none;
    }

    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-brand-500);
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    .spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  render() {
    const variantClass = VARIANT_CLASSES[this.variant] || VARIANT_CLASSES.primary;
    const sizeClass = SIZE_CLASSES[this.size] || SIZE_CLASSES.md;
    const classes = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium',
      'transition-[background-color,color,border-color,box-shadow,filter,transform] duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50',
      'active:scale-[.98] disabled:pointer-events-none disabled:opacity-50',
      variantClass,
      sizeClass,
    );

    const spinnerSize =
      this.size === 'sm' || this.size === 'icon-sm' ? 14 : this.size === 'lg' ? 18 : 16;

    return html`
      <button
        type="${this.type}"
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        aria-busy="${this.loading}"
        aria-label="${this.ariaLabel || ''}"
        aria-disabled="${this.disabled || this.loading}"
      >
        ${
          this.loading
            ? html`
                <svg
                  class="spinner h-${spinnerSize} w-${spinnerSize} text-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              `
            : ''
        }
        <slot></slot>
      </button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', () => (this._focusVisible = true));
    this.addEventListener('blur', () => (this._focusVisible = false));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-button': EmcButton;
  }
}
