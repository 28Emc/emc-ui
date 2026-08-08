/* ============================================================================
   EMC UI - Skeleton Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

@customElement('emc-skeleton')
export class EmcSkeleton extends LitElement {
  @property({ type: String }) variant: SkeletonVariant = 'rectangular';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = '1rem';
  @property({ type: Number }) borderRadius = 8;

  static styles = css`
    :host {
      display: inline-block;
    }

    .skeleton {
      background: linear-gradient(
        90deg,
        var(--surface-2) 25%,
        var(--surface-3) 50%,
        var(--surface-2) 75%
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s ease-in-out infinite;
      border-radius: var(--skeleton-radius, 8px);
    }

    @keyframes skeleton-loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    .skeleton.text {
      height: 1rem;
      width: 100%;
      border-radius: 4px;
    }

    .skeleton.circular {
      border-radius: 50%;
      aspect-ratio: 1;
    }

    .skeleton.rectangular {
      border-radius: 8px;
    }
  `;

  render() {
    const variantClass = `skeleton skeleton-${this.variant}`;
    const style = `width: ${this.width}; height: ${this.height}; border-radius: ${this.borderRadius}px;`;

    return html`
      <div class="skeleton ${this.variant}" style="${style}" aria-hidden="true"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-skeleton': EmcSkeleton;
  }
}