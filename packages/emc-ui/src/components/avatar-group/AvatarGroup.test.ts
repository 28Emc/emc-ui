import { describe, it, expect, beforeEach } from 'vitest';
import { EmcAvatarGroup } from '../avatar/AvatarGroup';
import { flush } from '../../test/helpers';

describe('EmcAvatarGroup', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createGroup(props: Partial<EmcAvatarGroup> = {}): EmcAvatarGroup {
    const el = new EmcAvatarGroup();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders one avatar per visible user', async () => {
    const el = createGroup({
      avatars: [{ name: 'Ana' }, { name: 'Bob' }, { name: 'Caro' }],
      max: 3,
    });
    await flush(el);
    expect(el.shadowRoot!.querySelectorAll('.avatar-item').length).toBe(3);
    expect(el.shadowRoot!.querySelector('.avatar-overflow')).toBeNull();
  });

  it('limits visible avatars and shows the overflow count', async () => {
    const el = createGroup({
      avatars: [{ name: 'Ana' }, { name: 'Bob' }, { name: 'Caro' }],
      max: 2,
    });
    await flush(el);
    expect(el.shadowRoot!.querySelectorAll('.avatar-item').length).toBe(3);
    expect(el.shadowRoot!.querySelector('.avatar-overflow')!.textContent!.trim()).toBe('+1');
  });

  it('renders initials and applies the size class used by its CSS', async () => {
    const el = createGroup({ avatars: [{ name: 'John Doe' }], size: 'lg' });
    await flush(el);
    const item = el.shadowRoot!.querySelector('.avatar-item')!;
    expect(item.classList.contains('avatar-item')).toBe(true);
    expect(item.classList.contains('lg')).toBe(true);
    expect(el.shadowRoot!.querySelector('.avatar')!.textContent!.trim()).toBe('JD');
  });
});
