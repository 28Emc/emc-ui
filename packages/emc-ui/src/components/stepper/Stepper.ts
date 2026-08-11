/* ============================================================================
   EMC UI - Stepper Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('emc-stepper')
export class EmcStepper extends LitElement {
  @property({ type: Number }) steps = 3;
  @property({ type: Array }) labels: string[] = [];
  @property({ type: Number }) activeIndex = 0;

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

    .step-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      transition:
        background-color 200ms,
        color 200ms,
        box-shadow 200ms;
    }

    .step-active {
      background-color: var(--color-brand-500);
      color: #fff;
    }

    .step-current {
      box-shadow: 0 0 0 1rem color-mix(in srgb, var(--color-brand-500) 20%, transparent);
    }

    .step-pending {
      background-color: var(--surface-2);
      color: var(--fg-muted);
    }

    .step-number {
      font-size: 0.875rem;
      font-weight: 500;
      color: inherit;
    }

    .step-number.active {
      font-weight: 600;
      color: #fff;
    }

    .step-check {
      width: 14px;
      height: 14px;
      color: #fff;
    }

    .step-label {
      display: none;
      font-size: 0.75rem;
      color: var(--fg-muted);
      padding: 0 0.25rem;
      white-space: nowrap;
      flex-shrink: 0;
    }

    @media (min-width: 768px) {
      .step-label {
        display: block;
      }
    }
  `;

  protected get indices(): number[] {
    return Array.from({ length: this.steps }, (_, i) => i);
  }

  protected stepClasses(index: number): string {
    const classes = ['step-circle'];

    if (index < this.activeIndex) {
      classes.push('step-active');
    } else if (index === this.activeIndex) {
      classes.push('step-active step-current');
    } else {
      classes.push('step-pending');
    }

    return classes.join(' ');
  }

  protected lineClasses(index: number): string {
    return `step-line ${index < this.activeIndex ? 'completed' : 'pending'}`;
  }

  render() {
    return html`
      <div class="stepper">
        ${this.indices.map(
          (idx) => html`
            <div class="step">
              <div
                class="${this.stepClasses(idx)}"
                aria-current="${this.activeIndex === idx ? 'step' : 'false'}"
              >
                ${
                  this.activeIndex > idx
                    ? html`
                        <svg
                          class="step-check"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
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
                      ? html` <span class="step-number active">${idx + 1}</span> `
                      : html` <span class="step-number">${idx + 1}</span> `
                }
              </div>
              ${this.labels[idx] ? html` <span class="step-label">${this.labels[idx]}</span> ` : ''}
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
