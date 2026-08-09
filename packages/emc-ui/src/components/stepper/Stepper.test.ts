import { describe, it, expect, beforeEach } from 'vitest';
import { EmcStepper } from './Stepper';
import { flush } from '../../test/helpers';

describe('EmcStepper', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createStepper(props: Partial<EmcStepper> = {}): EmcStepper {
    const el = new EmcStepper();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders one step per count', async () => {
    const el = createStepper({ steps: 4 });
    await flush(el);
    expect(el.shadowRoot!.querySelectorAll('.step').length).toBe(4);
  });

  it('marks the active step with aria-current', async () => {
    const el = createStepper({ steps: 3, activeIndex: 1 });
    await flush(el);
    const circles = el.shadowRoot!.querySelectorAll('.step-circle');
    expect(circles[0]!.getAttribute('aria-current')).toBe('false');
    expect(circles[1]!.getAttribute('aria-current')).toBe('step');
    expect(circles[2]!.getAttribute('aria-current')).toBe('false');
  });

  it('shows a checkmark on completed steps and the number on the active step', async () => {
    const el = createStepper({ steps: 3, activeIndex: 1 });
    await flush(el);
    const circles = el.shadowRoot!.querySelectorAll('.step-circle');
    expect(circles[0]!.querySelector('svg')).not.toBeNull();
    expect(circles[1]!.textContent!.trim()).toBe('2');
  });

  it('marks lines before the active step as completed', async () => {
    const el = createStepper({ steps: 3, activeIndex: 2 });
    await flush(el);
    const lines = el.shadowRoot!.querySelectorAll('.step-line');
    expect(lines[0]!.classList.contains('completed')).toBe(true);
    expect(lines[1]!.classList.contains('completed')).toBe(true);
  });
});
