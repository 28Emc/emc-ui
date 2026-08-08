/* ============================================================================
   EMC UI - Avatar Group Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface AvatarGroupUser {
  name: string;
  color?: string;
}

export type AvatarSize = 'sm' | 'md' | 'lg';

@customElement('emc-avatar-group')
export class EmcAvatarGroup extends LitElement {
  @property({ type: Array }) avatars: AvatarGroupUser[] = [];
  @property({ type: Number }) max = 5;
  @property({ type: String }) size: AvatarSize = 'md';

  protected getInitials(name: string): string {
    const nameStr = name.trim();
    if (!nameStr) return '?';
    const parts = nameStr.split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  protected getStyleForUser(user: AvatarGroupUser): string {
    if (user.color) {
      return `background-color: ${user.color};`;
    }
    return 'background: var(--brand-gradient);';
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    .avatar-group {
      display: inline-flex;
      align-items: center;
    }

    .avatar-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      border: 2px solid var(--surface);
      transition: transform 150ms ease-out;
      flex-shrink: 0;
      color: #fff;
      font-weight: 600;
    }

    .avatar-item:first-child {
      margin-left: 0;
    }

    .avatar-item:not(:first-child) {
      margin-left: -8px;
    }

    .avatar-item:hover {
      transform: translateY(-2px);
      z-index: 10;
    }

    .avatar-item.sm {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }

    .avatar-item.md {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.875rem;
    }

    .avatar-item.lg {
      width: 3rem;
      height: 3rem;
      font-size: 1rem;
    }

    .avatar-overflow {
      background-color: var(--surface-2);
      color: var(--fg-muted);
      font-weight: 600;
    }
  `;

  render() {
    const visibleUsers = this.avatars.slice(0, Math.max(1, this.max));
    const overflowCount = Math.max(0, this.avatars.length - this.max);

    return html`
      <div class="avatar-group">
        ${visibleUsers.map(
          (user) => html`
            <div class="avatar-item ${this.size}">
              <span class="avatar" style="${this.getStyleForUser(user)}">
                ${this.getInitials(user.name)}
              </span>
            </div>
          `,
        )}
        ${
          overflowCount > 0
            ? html` <div class="avatar-item avatar-overflow">+${overflowCount}</div> `
            : ''
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-avatar-group': EmcAvatarGroup;
  }
}
