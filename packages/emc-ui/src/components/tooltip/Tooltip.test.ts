import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { EmcTooltip } from './Tooltip';
import { flush } from '../../test/helpers';
import { computePosition } from '@floating-ui/dom';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 0, y: 0, placement: 'top' }),
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

describe('EmcTooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function createTooltip(props: Partial<EmcTooltip> = {}): EmcTooltip {
    const el = new EmcTooltip();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('does not render the tooltip by default', async () => {
    const el = createTooltip({ content: 'Info' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.tooltip')).toBeNull();
  });

  it('shows the tooltip on mouseenter after the delay', async () => {
    vi.useFakeTimers();
    const el = createTooltip({ content: 'Info', delay: 0 });
    await flush(el);
    el.shadowRoot!.querySelector('.tooltip-trigger')!.dispatchEvent(new Event('mouseenter'));
    await vi.advanceTimersByTimeAsync(0);
    await flush(el);
    const tooltip = el.shadowRoot!.querySelector('.tooltip')!;
    expect(tooltip).not.toBeNull();
    expect(tooltip.getAttribute('role')).toBe('tooltip');
  });

  it('respects the configured delay before showing', async () => {
    vi.useFakeTimers();
    const el = createTooltip({ content: 'Info', delay: 200 });
    await flush(el);
    const trigger = el.shadowRoot!.querySelector('.tooltip-trigger')!;
    trigger.dispatchEvent(new Event('mouseenter'));
    await vi.advanceTimersByTimeAsync(100);
    await flush(el);
    expect(el.shadowRoot!.querySelector('.tooltip')).toBeNull();
    await vi.advanceTimersByTimeAsync(100);
    await flush(el);
    expect(el.shadowRoot!.querySelector('.tooltip')).not.toBeNull();
  });

  it('shows on keyboard focus and hides on blur', async () => {
    vi.useFakeTimers();
    const el = createTooltip({ content: 'Info', delay: 0 });
    await flush(el);
    const trigger = el.shadowRoot!.querySelector('.tooltip-trigger')!;
    trigger.dispatchEvent(new Event('focusin'));
    await vi.advanceTimersByTimeAsync(0);
    await flush(el);
    expect(el.shadowRoot!.querySelector('.tooltip')).not.toBeNull();
    trigger.dispatchEvent(new Event('focusout'));
    await vi.advanceTimersByTimeAsync(100);
    await flush(el);
    expect(el.shadowRoot!.querySelector('.tooltip')).toBeNull();
  });

  it('positions the tooltip using floating-ui', async () => {
    vi.mocked(computePosition).mockResolvedValueOnce({ x: 5, y: 6, placement: 'right' });
    const el = createTooltip({ content: 'Info', delay: 0, placement: 'right' });
    await flush(el);
    el.shadowRoot!.querySelector('.tooltip-trigger')!.dispatchEvent(new Event('mouseenter'));
    await new Promise((resolve) => setTimeout(resolve, 0));
    await flush(el);
    const tooltip = el.shadowRoot!.querySelector('.tooltip')!;
    expect(tooltip.getAttribute('data-placement')).toBe('right');
    expect(tooltip.style.left).toBe('5px');
    expect(tooltip.style.top).toBe('6px');
  });

  it('hides the tooltip on mouseleave', async () => {
    vi.useFakeTimers();
    const el = createTooltip({ content: 'Info', delay: 0 });
    await flush(el);
    const trigger = el.shadowRoot!.querySelector('.tooltip-trigger')!;
    trigger.dispatchEvent(new Event('mouseenter'));
    await vi.advanceTimersByTimeAsync(0);
    await flush(el);
    trigger.dispatchEvent(new Event('mouseleave'));
    await vi.advanceTimersByTimeAsync(100);
    await flush(el);
    expect(el.shadowRoot!.querySelector('.tooltip')).toBeNull();
  });
});
