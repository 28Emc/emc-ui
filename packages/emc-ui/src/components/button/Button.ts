/* ============================================================================
   EMC UI - Button Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'variant-primary',
  secondary: 'variant-secondary',
  ghost: 'variant-ghost',
  danger: 'variant-danger',
  outline: 'variant-outline',
  subtle: 'variant-subtle',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'size-sm',
  md: 'size-md',
  lg: 'size-lg',
  icon: 'size-icon',
  'icon-sm': 'size-icon-sm',
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
      display: inline-block;
    }

    .emc-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      white-space: nowrap;
      border-radius: var(--radius-xl, 0.75rem);
      font-family: var(--font-sans, inherit);
      font-weight: 500;
      cursor: pointer;
      transition:
        background-color 150ms,
        color 150ms,
        border-color 150ms,
        box-shadow 150ms,
        filter 150ms,
        transform 150ms;
      outline: none;
      border: none;
    }

    .emc-button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-brand-500) 50%, transparent);
    }

    .emc-button:active:not(:disabled) {
      transform: scale(0.98);
    }

    .emc-button:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    .spinner {
      animation: spin 1s linear infinite;
      display: inline-block;
      flex-shrink: 0;
    }

    .circle-base {
      opacity: 0.25;
    }

    .path-fill {
      opacity: 0.75;
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

    .variant-primary {
      background-color: var(--color-brand-500);
      color: #fff;
      box-shadow: var(--shadow-soft);
      border: none;
    }
    .variant-primary:hover {
      background-color: var(--color-brand-600);
    }

    .variant-secondary {
      border: 1px solid var(--border);
      background-color: var(--surface);
      color: var(--fg);
    }
    .variant-secondary:hover {
      background-color: var(--surface-2);
    }

    .variant-ghost {
      color: var(--fg);
      background: transparent;
      border: none;
    }
    .variant-ghost:hover {
      background-color: var(--surface-2);
    }

    .variant-danger {
      background-color: var(--color-red-500);
      color: #fff;
      border: none;
    }
    .variant-danger:hover {
      background-color: var(--color-red-600);
    }

    .variant-outline {
      border: 1px solid var(--color-brand-500);
      color: var(--color-brand-600);
      background: transparent;
    }
    .variant-outline:hover {
      background-color: color-mix(in srgb, var(--color-brand-500) 10%, transparent);
    }
    .dark .variant-outline {
      border-color: var(--color-brand-400);
      color: var(--color-brand-400);
    }

    .variant-subtle {
      background-color: var(--color-brand-100);
      color: var(--color-brand-700);
      border: none;
    }
    .variant-subtle:hover {
      background-color: var(--color-brand-200);
    }

    .size-sm {
      height: 2rem;
      gap: 0.25rem;
      padding-inline: 0.75rem;
      font-size: 0.875rem;
    }

    .size-md {
      height: 2.5rem;
      gap: 0.5rem;
      padding-inline: 1rem;
      font-size: 0.875rem;
    }

    .size-lg {
      height: 3rem;
      gap: 0.5rem;
      padding-inline: 1.5rem;
      font-size: 1rem;
    }

    .size-icon {
      height: 2.5rem;
      width: 2.5rem;
      padding: 0;
      font-size: 1rem;
    }

    .size-icon-sm {
      height: 2rem;
      width: 2rem;
      padding: 0;
      font-size: 0.875rem;
    }
  `;

  render() {
    const variantClass = VARIANT_CLASSES[this.variant] || VARIANT_CLASSES.primary;
    const sizeClass = SIZE_CLASSES[this.size] || SIZE_CLASSES.md;
    const classes = cn('emc-button', variantClass, sizeClass);

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
        style="${this.disabled || this.loading ? 'pointer-events: none; opacity: 0.5;' : ''}"
      >
        ${
          this.loading
            ? html`
                <svg
                  class="spinner"
                  style="width: ${spinnerSize}px; height: ${spinnerSize}px;"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    class="circle-base"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="path-fill"
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
