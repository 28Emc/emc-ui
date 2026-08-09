import { describe, it, expect, beforeEach } from 'vitest';
import { EmcTabs } from './Tabs';
import { EmcTab } from './Tab';
import { EmcTabPanel } from './TabPanel';
import { flush } from '../../test/helpers';

describe('EmcTabs', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createTabs(): EmcTabs {
    const el = new EmcTabs();
    el.innerHTML = `
      <button slot="tabs" role="tab">Tab 1</button>
      <button slot="tabs" role="tab">Tab 2</button>
      <div slot="panels" role="tabpanel">Panel 1</div>
      <div slot="panels" role="tabpanel">Panel 2</div>
    `;
    document.body.appendChild(el);
    return el;
  }

  it('renders a tablist with the given label', async () => {
    const el = createTabs();
    el.label = 'My tabs';
    await flush(el);
    const list = el.shadowRoot!.querySelector('.tabs-list')!;
    expect(list.getAttribute('role')).toBe('tablist');
    expect(list.getAttribute('aria-label')).toBe('My tabs');
  });

  it('renders the tabs and panels slots', async () => {
    const el = createTabs();
    await flush(el);
    expect(el.shadowRoot!.querySelector('slot[name="tabs"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot[name="panels"]')).not.toBeNull();
  });

  it('selects a tab and reflects aria-selected on the slotted buttons', async () => {
    const el = createTabs();
    await flush(el);
    el.select(1);
    await flush(el);
    const buttons = el.querySelectorAll('button[slot="tabs"]');
    expect(buttons[0]!.getAttribute('aria-selected')).toBe('false');
    expect(buttons[1]!.getAttribute('aria-selected')).toBe('true');
    expect(buttons[1]!.hasAttribute('data-active')).toBe(true);
  });

  it('hides panels that are not active', async () => {
    const el = createTabs();
    await flush(el);
    el.select(1);
    await flush(el);
    const panels = el.querySelectorAll('[slot="panels"]');
    expect((panels[0] as HTMLElement).hidden).toBe(true);
    expect((panels[1] as HTMLElement).hidden).toBe(false);
  });

  it('moves selection with arrow keys', async () => {
    const el = createTabs();
    await flush(el);
    const buttons = el.querySelectorAll('button[slot="tabs"]');
    buttons[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await flush(el);
    expect(buttons[1]!.getAttribute('aria-selected')).toBe('true');
  });

  it('selects a tab when it is clicked', async () => {
    const el = createTabs();
    await flush(el);
    (el.querySelectorAll('button[slot="tabs"]')[1] as HTMLButtonElement).click();
    await flush(el);
    expect(el.querySelectorAll('button[slot="tabs"]')[1]!.getAttribute('aria-selected')).toBe(
      'true',
    );
  });

  it('works with emc-tab subcomponents', async () => {
    const el = new EmcTabs();
    const tab1 = new EmcTab();
    tab1.slot = 'tabs';
    tab1.textContent = 'Alpha';
    const tab2 = new EmcTab();
    tab2.slot = 'tabs';
    tab2.textContent = 'Beta';
    const panel1 = new EmcTabPanel();
    panel1.slot = 'panels';
    panel1.textContent = 'A';
    const panel2 = new EmcTabPanel();
    panel2.slot = 'panels';
    panel2.textContent = 'B';
    el.append(tab1, tab2, panel1, panel2);
    document.body.appendChild(el);
    await flush(el);
    await Promise.all([
      tab1.updateComplete,
      tab2.updateComplete,
      panel1.updateComplete,
      panel2.updateComplete,
    ]);
    el.shadowRoot!.querySelector('slot[name="tabs"]')!.dispatchEvent(new Event('slotchange'));
    el.shadowRoot!.querySelector('slot[name="panels"]')!.dispatchEvent(new Event('slotchange'));
    await flush(el);
    el.select(1);
    await flush(el);
    const tabButtons = [tab1, tab2].map((tab) =>
      tab.shadowRoot!.querySelector('button[role="tab"]')!,
    );
    expect(tabButtons.length).toBe(2);
    expect(tabButtons[1]!.getAttribute('aria-selected')).toBe('true');
  });
});
