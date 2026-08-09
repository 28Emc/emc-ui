import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EmcPopover } from './Popover';
import { flush } from '../../test/helpers';
import { computePosition } from '@floating-ui/dom';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 0, y: 0, placement: 'bottom' }),
  autoUpdate: vi.fn(
    async (_reference: unknown, _floating: unknown, update: () => Promise<void>) => {
      await update();
      return () => {};
    },
  ),
  flip: vi.fn().mockReturnValue({ name: 'flip' }),
  shift: vi.fn().mockReturnValue({ name: 'shift' }),
  offset: vi.fn().mockReturnValue({ name: 'offset' }),
}));

describe('EmcPopover', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createPopover(props: Partial<EmcPopover> = {}): EmcPopover {
    const el = new EmcPopover();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('does not render the dialog by default', async () => {
    const el = createPopover();
    await flush(el);
    expect(el.shadowRoot!.querySelector('.popover')).toBeNull();
    expect(el.shadowRoot!.querySelector('.popover-trigger')!.getAttribute('aria-expanded')).toBe(
      'false',
    );
  });

  it('opens when the trigger is clicked', async () => {
    const el = createPopover({ label: 'Menu' });
    await flush(el);
    const trigger = el.shadowRoot!.querySelector('.popover-trigger') as HTMLButtonElement;
    trigger.click();
    await flush(el);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(el.shadowRoot!.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('closes when the trigger is clicked again', async () => {
    const el = createPopover({ label: 'Menu' });
    await flush(el);
    const trigger = el.shadowRoot!.querySelector('.popover-trigger') as HTMLButtonElement;
    trigger.click();
    await flush(el);
    trigger.click();
    await flush(el);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(el.shadowRoot!.querySelector('.popover')).toBeNull();
  });

  it('renders the dialog when open initially', async () => {
    const el = createPopover({ open: true });
    await flush(el);
    expect(el.shadowRoot!.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('positions the dialog using floating-ui when opened', async () => {
    vi.mocked(computePosition).mockResolvedValueOnce({ x: 12, y: 14, placement: 'right' });
    const el = createPopover({ label: 'Menu' });
    await flush(el);
    (el.shadowRoot!.querySelector('.popover-trigger') as HTMLButtonElement).click();
    await flush(el);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await flush(el);
    const dialog = el.shadowRoot!.querySelector('[role="dialog"]')!;
    expect(dialog.getAttribute('data-placement')).toBe('right');
    expect(dialog.style.left).toBe('12px');
    expect(dialog.style.top).toBe('14px');
  });

  it('closes the popover with the Escape key', async () => {
    const el = createPopover({ label: 'Menu' });
    await flush(el);
    const trigger = el.shadowRoot!.querySelector('.popover-trigger') as HTMLButtonElement;
    trigger.click();
    await flush(el);
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await flush(el);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(el.shadowRoot!.querySelector('[role="dialog"]')).toBeNull();
  });

  it('closes the popover when clicking outside', async () => {
    const el = createPopover({ label: 'Menu' });
    await flush(el);
    (el.shadowRoot!.querySelector('.popover-trigger') as HTMLButtonElement).click();
    await flush(el);
    expect(el.shadowRoot!.querySelector('[role="dialog"]')).not.toBeNull();
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
    await flush(el);
    expect(el.shadowRoot!.querySelector('[role="dialog"]')).toBeNull();
  });

  it('exposes a trigger with accessible attributes', async () => {
    const el = createPopover({ ariaLabel: 'Options' });
    await flush(el);
    const trigger = el.shadowRoot!.querySelector('.popover-trigger')!;
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-label')).toBe('Options');
  });
});
