import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { EmcTooltip } from './Tooltip';
import { flush } from '../../test/helpers';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 0, y: 0, placement: 'top' }),
  autoUpdate: vi.fn().mockReturnValue(() => {}),
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

  it('sets the data-placement attribute on the visible tooltip', async () => {
    vi.useFakeTimers();
    const el = createTooltip({ content: 'Info', delay: 0, placement: 'right' });
    await flush(el);
    el.shadowRoot!.querySelector('.tooltip-trigger')!.dispatchEvent(new Event('mouseenter'));
    await vi.advanceTimersByTimeAsync(0);
    await flush(el);
    expect(el.shadowRoot!.querySelector('.tooltip')!.getAttribute('data-placement')).toBe('right');
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
