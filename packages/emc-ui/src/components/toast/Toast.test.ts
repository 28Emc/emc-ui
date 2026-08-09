import { describe, it, expect, vi, afterEach } from 'vitest';
import { EmcToast, type Toast } from './Toast';
import { flush } from '../../test/helpers';

describe('EmcToast', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function createToast(toast: Toast, props: Partial<EmcToast> = {}): EmcToast {
    const el = new EmcToast();
    el.toast = toast;
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders title, description and a close button', async () => {
    const el = createToast({ id: '1', title: 'Saved', description: 'All good' });
    await flush(el);
    const root = el.shadowRoot!;
    expect(root.querySelector('.toast')!.getAttribute('role')).toBe('status');
    expect(root.querySelector('.toast-title')!.textContent).toBe('Saved');
    expect(root.querySelector('.toast-description')!.textContent).toBe('All good');
    expect(root.querySelector('.toast-close')).not.toBeNull();
  });

  it('applies the variant class', async () => {
    const el = createToast({ id: '1', title: 'Error', variant: 'error' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.toast')!.classList.contains('error')).toBe(true);
  });

  it('renders an action button when provided', async () => {
    const action = { label: 'Retry', onClick: vi.fn() };
    const el = createToast({ id: '1', title: 'Failed', action });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.toast-action button')!.textContent).toBe('Retry');
  });

  it('auto-dismisses after the configured duration', async () => {
    vi.useFakeTimers();
    const dismiss = vi.fn();
    const el = createToast({ id: '1', title: 'Temp', duration: 500 });
    el.setDismissCallback(dismiss);
    await flush(el);
    await vi.advanceTimersByTimeAsync(500);
    expect(dismiss).toHaveBeenCalledWith('1');
  });

  it('removes itself when the close button is clicked', async () => {
    const el = createToast({ id: '1', title: 'X' });
    await flush(el);
    (el.shadowRoot!.querySelector('.toast-close') as HTMLButtonElement).click();
    expect(document.body.contains(el)).toBe(false);
  });
});
