/* ============================================================================
   EMC UI - Avatar Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type AvatarSize = 'sm' | 'md' | 'lg';

@customElement('emc-avatar')
export class EmcAvatar extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) color = '';
  @property({ type: String }) size: AvatarSize = 'md';

  static styles = css`
    :host {
      display: inline-flex;
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      font-weight: 600;
      color: white;
      flex-shrink: 0;
    }

    .avatar-gradient {
      background: var(--brand-gradient);
    }

    .avatar-sm {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }

    .avatar-md {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.875rem;
    }

    .avatar-lg {
      width: 3rem;
      height: 3rem;
      font-size: 1rem;
    }
  `;

  protected getInitials(nameStr: string): string {
    const name = nameStr.trim();
    if (!name) return '?';
    const parts = name.split(/\s+/);
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
  }

  render() {
    const initials = this.getInitials(this.name);
    const hasColor = Boolean(this.color);

    const style = hasColor
      ? `background-color: ${this.color};`
      : 'background: var(--brand-gradient);';

    return html` <span class="avatar avatar-${this.size}" style="${style}"> ${initials} </span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-avatar': EmcAvatar;
  }
}
