/* ============================================================================
   EMC UI - Tabs Component
   ============================================================================ */

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('emc-tabs')
export class EmcTabs extends LitElement {
  @property({ type: Number }) activeIndex = 0;
  @property({ type: String }) label = '';

  @state() private tabs: HTMLButtonElement[] = [];
  private panels: HTMLElement[] = [];
  private tabHandlers = new WeakMap<
    HTMLButtonElement,
    { click: () => void; keydown: (e: KeyboardEvent) => void }
  >();

  static styles = css`
    :host {
      display: block;
    }

    .tabs-list {
      display: flex;
      gap: 0.25rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1px;
    }

    .tab-trigger {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--fg-muted);
      background: transparent;
      border: none;
      border-radius: var(--radius-xl, 0.75rem) var(--radius-xl, 0.75rem) 0 0;
      cursor: pointer;
      transition:
        color 150ms,
        background-color 150ms;
      position: relative;
      padding-bottom: calc(1rem - 1px);
      margin-bottom: -1px;
    }

    .tab-trigger:hover {
      color: var(--fg);
    }

    .tab-trigger:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-brand-500);
    }

    .tab-trigger[data-active] {
      color: var(--color-brand-600);
      background-color: var(--surface);
    }

    .tab-trigger[data-active]::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--color-brand-500);
    }

    .tab-trigger:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tab-panel {
      padding: 1.5rem 0;
      animation: fade-in 0.2s ease-out;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateTabs();
  }

  firstUpdated() {
    const tabsSlot = this.renderRoot.querySelector('slot[name="tabs"]');
    const panelsSlot = this.renderRoot.querySelector('slot[name="panels"]');
    tabsSlot?.addEventListener('slotchange', () => this.updateTabs());
    panelsSlot?.addEventListener('slotchange', () => this.updateTabs());
    this.updateTabs();
  }

  protected updateTabs() {
    const tabsSlot = this.renderRoot.querySelector('slot[name="tabs"]') as HTMLSlotElement | null;
    const panelsSlot = this.renderRoot.querySelector(
      'slot[name="panels"]',
    ) as HTMLSlotElement | null;

    this.tabs = [];
    if (tabsSlot) {
      for (const el of tabsSlot.assignedElements()) {
        if (el.matches('button[role="tab"]')) {
          this.tabs.push(el as HTMLButtonElement);
        } else if (el.tagName === 'EMC-TAB') {
          const button = el.shadowRoot?.querySelector('button[role="tab"]');
          if (button) this.tabs.push(button as HTMLButtonElement);
        }
      }
    }

    this.panels = [];
    if (panelsSlot) {
      for (const el of panelsSlot.assignedElements()) {
        if (el.matches('[role="tabpanel"]')) {
          this.panels.push(el as HTMLElement);
        } else if (el.tagName === 'EMC-TAB-PANEL') {
          const panel = el.shadowRoot?.querySelector('[role="tabpanel"]');
          if (panel) this.panels.push(panel as HTMLElement);
        }
      }
    }

    this.tabs.forEach((tab, index) => {
      const previous = this.tabHandlers.get(tab);
      if (previous) {
        tab.removeEventListener('click', previous.click);
        tab.removeEventListener('keydown', previous.keydown);
      }
      const click = () => this.select(index);
      const keydown = (e: KeyboardEvent) => this.handleKeydown(e, index);
      tab.addEventListener('click', click);
      tab.addEventListener('keydown', keydown);
      this.tabHandlers.set(tab, { click, keydown });
    });

    this.updateActiveTab();
  }

  protected handleKeydown(event: KeyboardEvent, index: number) {
    let newIndex = this.activeIndex;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (index + 1) % this.tabs.length;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = (index - 1 + this.tabs.length) % this.tabs.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = this.tabs.length - 1;
        break;
    }

    if (newIndex !== this.activeIndex) {
      this.select(newIndex);
    }
  }

  select(index: number) {
    if (index >= 0 && index < this.tabs.length) {
      this.activeIndex = index;
      this.updateActiveTab();
    }
  }

  protected updateActiveTab() {
    this.tabs.forEach((tab, index) => {
      const isActive = index === this.activeIndex;
      tab.setAttribute('aria-selected', isActive.toString());
      tab.toggleAttribute('data-active', isActive);
      tab.disabled = this.tabs[index]?.hasAttribute('disabled') || false;
    });

    this.panels?.forEach((panel, index) => {
      panel.hidden = index !== this.activeIndex;
    });
  }

  render() {
    return html`
      <div role="tablist" class="tabs-list" aria-label="${this.label || 'Tabs'}">
        <slot name="tabs"></slot>
      </div>
      <div class="tabs-panels">
        <slot name="panels"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emc-tabs': EmcTabs;
  }
}
