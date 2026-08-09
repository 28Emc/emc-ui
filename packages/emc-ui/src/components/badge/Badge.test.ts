import { describe, it, expect, beforeEach } from 'vitest';
import { EmcBadge } from './Badge';
import { flush } from '../../test/helpers';

describe('EmcBadge', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createBadge(props: Partial<EmcBadge> = {}): EmcBadge {
    const el = new EmcBadge();
    Object.assign(el, props);
    el.textContent = 'Label';
    document.body.appendChild(el);
    return el;
  }

  it('renders a badge span with the default variant class', async () => {
    const el = createBadge();
    await flush(el);
    const badge = el.shadowRoot!.querySelector('.badge');
    expect(badge).not.toBeNull();
    expect(badge!.classList.contains('badge-default')).toBe(true);
  });

  it('applies the requested variant class', async () => {
    const el = createBadge({ variant: 'brand' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.badge')!.classList.contains('badge-brand')).toBe(true);
  });

  it('renders slotted content', async () => {
    const el = createBadge();
    await flush(el);
    expect(el.textContent).toBe('Label');
  });
});
