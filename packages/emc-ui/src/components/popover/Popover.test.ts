import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EmcPopover } from './Popover';
import { flush } from '../../test/helpers';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 0, y: 0, placement: 'bottom' }),
  autoUpdate: vi.fn().mockReturnValue(() => {}),
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

  it('exposes a trigger with accessible attributes', async () => {
    const el = createPopover({ ariaLabel: 'Options' });
    await flush(el);
    const trigger = el.shadowRoot!.querySelector('.popover-trigger')!;
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-label')).toBe('Options');
  });
});
