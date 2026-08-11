// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmcButton } from './Button';

function createButton(props: Record<string, unknown> = {}): EmcButton {
  const el = new EmcButton();
  for (const [key, value] of Object.entries(props)) {
    if (value === true) {
      el.setAttribute(key, '');
    } else if (value !== false && value != null) {
      el.setAttribute(key, String(value));
    }
  }
  el.textContent = 'Test';
  document.body.appendChild(el);
  return el;
}

async function flush(el: EmcButton): Promise<void> {
  await el.updateComplete;
}

function getButton(el: EmcButton): HTMLButtonElement {
  const button = el.shadowRoot!.querySelector('button');
  if (!button) throw new Error('No button rendered');
  return button as HTMLButtonElement;
}

describe('EmcButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default props', async () => {
    const el = createButton();
    await flush(el);
    const button = getButton(el);
    expect(button).not.toBeNull();
    expect(button.disabled).toBe(false);
  });

  it('applies variant classes', async () => {
    const el = createButton({ variant: 'secondary' });
    await flush(el);
    const button = getButton(el);
    expect(button.classList.contains('variant-secondary')).toBe(true);
  });

  it('applies size classes', async () => {
    const el = createButton({ size: 'lg' });
    await flush(el);
    const button = getButton(el);
    expect(button.classList.contains('size-lg')).toBe(true);
  });

  it('shows loading spinner when loading', async () => {
    const el = createButton({ loading: true });
    await flush(el);
    const button = getButton(el);
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(el.shadowRoot!.querySelector('svg.spinner')).not.toBeNull();
  });

  it('disables button when disabled', async () => {
    const el = createButton({ disabled: true });
    await flush(el);
    const button = getButton(el);
    expect(button.disabled).toBe(true);
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const el = createButton();
    el.addEventListener('click', handleClick);
    await flush(el);
    getButton(el).click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call click handler when disabled', async () => {
    const handleClick = vi.fn();
    const el = createButton({ disabled: true });
    el.addEventListener('click', handleClick);
    await flush(el);
    getButton(el).click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
