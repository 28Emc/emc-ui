import { describe, it, expect, beforeEach } from 'vitest';
import { EmcAvatar } from './Avatar';
import { flush } from '../../test/helpers';

describe('EmcAvatar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createAvatar(props: Partial<EmcAvatar> = {}): EmcAvatar {
    const el = new EmcAvatar();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders initials for a full name', async () => {
    const el = createAvatar({ name: 'John Doe' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.avatar')!.textContent!.trim()).toBe('JD');
  });

  it('renders a placeholder when no name is given', async () => {
    const el = createAvatar();
    await flush(el);
    expect(el.shadowRoot!.querySelector('.avatar')!.textContent!.trim()).toBe('?');
  });

  it('applies the size class used by its CSS', async () => {
    const el = createAvatar({ size: 'lg' });
    await flush(el);
    const span = el.shadowRoot!.querySelector('.avatar')!;
    expect(span.classList.contains('avatar')).toBe(true);
    expect(span.classList.contains('avatar-lg')).toBe(true);
  });

  it('applies a custom color as background style', async () => {
    const el = createAvatar({ color: '#ff0000' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.avatar')!.getAttribute('style')).toContain('#ff0000');
  });
});
