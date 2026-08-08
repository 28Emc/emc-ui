/* ============================================================================
   EMC UI - Stepper Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('emc-stepper')
export class EmcStepper extends LitElement {
  @property({ type: Number }) steps = 3;
  @property({ type: Array }) labels: string[] = [];
  @property({ type: Number }) activeIndex = 0;

  @state() private active = 0;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .stepper {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .step {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .step-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      font-size: 0.875rem;
      font-weight: 600;
      transition:
        background-color 200ms,
        color 200ms,
        box-shadow 200ms;
    }

    .step-circle.completed {
      background-color: var(--color-brand-500);
      color: white;
    }

    .step-circle.active {
      background-color: var(--color-brand-500);
      color: white;
      box-shadow: 0 0 0 4px var(--color-brand-500, #15a18b) / 20%;
    }

    .step-circle.pending {
      background-color: var(--surface-2);
      color: var(--fg-muted);
    }

    .step-label {
      display: none;
      font-size: 0.75rem;
      color: var(--fg-muted);
      padding: 0 0.25rem;
      white-space: nowrap;
    }

    @media (min-width: 768px) {
      .step-label {
        display: block;
      }
    }

    .step-line {
      flex: 1;
      height: 2px;
      transition: background-color 200ms;
    }

    .step-line.completed {
      background-color: var(--color-brand-500);
    }

    .step-line.pending {
      background-color: var(--surface-2);
    }
  `;

  protected get indices(): number[] {
    return Array.from({ length: this.steps }, (_, i) => i);
  }

  protected stepClasses(index: number): string {
    const classes = [
      'step-circle',
      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium',
      'transition-[background-color,color,box-shadow] duration-200',
    ];

    if (index < this.activeIndex) {
      classes.push('bg-brand-500 text-white');
    } else if (index === this.activeIndex) {
      classes.push('bg-brand-500 text-white ring-4 ring-brand-500/20');
    } else {
      classes.push('bg-surface-2 text-muted');
    }

    return classes.join(' ');
  }

  protected lineClasses(index: number): string {
    return `step-line ${index < this.active ? 'completed' : 'pending'}`;
  }

  render() {
    return html`
      <div class="stepper">
        ${this.indices.map(
          (idx) => html`
            <div class="step">
              <div
                class="${this.stepClasses(idx)}"
                aria-current="${this.activeIndex === idx ? 'step' : null}"
              >
                ${
                  this.activeIndex > idx
                    ? html`
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          class="text-white"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      `
                    : this.activeIndex === idx
                      ? html` <span class="text-sm font-semibold text-white">${idx + 1}</span> `
                      : html` <span class="text-sm font-medium">${idx + 1}</span> `
                }
              </div>
              ${
                this.labels[idx]
                  ? html`
                      <span class="step-label hidden md:block text-xs text-muted px-1"
                        >${this.labels[idx]}</span
                      >
                    `
                  : ''
              }
              ${idx < this.steps - 1 ? html` <div class="${this.lineClasses(idx)}"></div> ` : ''}
            </div>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-stepper': EmcStepper;
  }
}
