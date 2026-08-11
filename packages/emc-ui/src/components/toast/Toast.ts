/* ============================================================================
   EMC UI - Toast Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: (id: string) => void;
  };
  duration?: number;
}

@customElement('emc-toast')
export class EmcToast extends LitElement {
  @property({ type: Object }) toast!: Toast;
  @property({ type: Boolean }) closable = true;

  private dismissTimeout: ReturnType<typeof setTimeout> | null = null;
  private dismissCallback: ((id: string) => void) | null = null;

  static styles = css`
    :host {
      display: block;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      border-radius: var(--radius-xl, 0.75rem);
      box-shadow: var(--shadow-pop);
      background-color: var(--surface);
      border: 1px solid var(--border);
      animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      min-width: 300px;
      max-width: 420px;
    }

    @keyframes slide-in-right {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .toast-icon {
      flex-shrink: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
    }

    .toast-icon.success {
      color: var(--color-green-500);
    }

    .toast-icon.error {
      color: var(--color-red-500);
    }

    .toast-icon.warning {
      color: var(--color-amber-500);
    }

    .toast-icon.default {
      color: var(--color-brand-500);
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--fg);
      margin-bottom: 0.25rem;
    }

    .toast-description {
      font-size: 0.875rem;
      color: var(--fg-muted);
      line-height: 1.4;
    }

    .toast-action {
      margin-top: 0.75rem;
    }

    .toast-action button {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-brand-600);
      background-color: var(--color-brand-50);
      border: none;
      border-radius: var(--radius-lg, 0.5rem);
      cursor: pointer;
      transition: background-color 150ms;
    }

    .toast-action button:hover {
      background-color: var(--color-brand-100);
    }

    .toast-close {
      flex-shrink: 0;
      padding: 0.25rem;
      color: var(--fg-muted);
      background: transparent;
      border: none;
      border-radius: var(--radius-md, 0.375rem);
      cursor: pointer;
      transition:
        color 150ms,
        background-color 150ms;
    }

    .toast-close:hover {
      color: var(--fg);
      background-color: var(--surface-2);
    }

    .toast-close:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-brand-500);
    }

    .toast-icon-svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .toast-close-svg {
      width: 1rem;
      height: 1rem;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.toast?.duration && this.toast.duration > 0) {
      this.dismissTimeout = setTimeout(() => this.dismiss(), this.toast.duration);
    }
  }

  disconnectedCallback() {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
    }
  }

  setDismissCallback(callback: (id: string) => void) {
    this.dismissCallback = callback;
  }

  dismiss() {
    this.dismissCallback?.(this.toast.id);
    this.remove();
  }

  render() {
    const variant = this.toast?.variant || 'default';

    const iconMap = {
      success: html`<svg
        class="toast-icon-svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 11a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>`,
      error: html`<svg class="toast-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-2 2l2 2m-2-2l2-2"
        />
      </svg>`,
      warning: html`<svg
        class="toast-icon-svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>`,
      default: html`<svg
        class="toast-icon-svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>`,
    };

    return html`
      <div class="toast ${variant}" role="status" aria-live="polite">
        <div class="toast-icon ${variant}">${iconMap[variant]}</div>
        <div class="toast-content">
          <p class="toast-title">${this.toast.title}</p>
          ${this.toast.description ? html`<p class="toast-description">${this.toast.description}</p>` : ''}
          ${
            this.toast.action
              ? html`
                  <div class="toast-action">
                    <button @click="${this.handleAction}">${this.toast.action!.label}</button>
                  </div>
                `
              : ''
          }
        </div>
        <button class="toast-close" @click="${this.dismiss}" aria-label="Cerrar">
          <svg class="toast-close-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    `;
  }

  private handleAction() {
    this.toast.action?.onClick?.(this.toast.id);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-toast': EmcToast;
  }
}
