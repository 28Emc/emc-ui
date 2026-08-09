import { describe, it, expect, beforeEach } from 'vitest';
import { EmcProgress } from './Progress';
import { flush } from '../../test/helpers';

describe('EmcProgress', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createProgress(props: Partial<EmcProgress> = {}): EmcProgress {
    const el = new EmcProgress();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders a progressbar with ARIA attributes', async () => {
    const el = createProgress({ value: 50 });
    await flush(el);
    const bar = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(bar).not.toBeNull();
    expect(bar.getAttribute('aria-valuenow')).toBe('50');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
  });

  it('applies the size class used by its CSS', async () => {
    const el = createProgress({ size: 'lg' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.progress-bar')!.classList.contains('size-lg')).toBe(true);
  });

  it('shows the indeterminate state without a numeric value', async () => {
    const el = createProgress({ indeterminate: true });
    await flush(el);
    const progress = el.shadowRoot!.querySelector('.progress')!;
    expect(progress.classList.contains('progress-indeterminate')).toBe(true);
    expect(
      el.shadowRoot!.querySelector('[role="progressbar"]')!.getAttribute('aria-valuenow'),
    ).toBe('0');
  });

  it('renders a label with the current percentage', async () => {
    const el = createProgress({ value: 25, label: 'Uploading' });
    await flush(el);
    const label = el.shadowRoot!.querySelector('.progress-label')!;
    expect(label.textContent).toContain('Uploading');
    expect(label.textContent).toContain('25%');
  });
});
