import { describe, it, expect, beforeEach } from 'vitest';
import { EmcCard } from './Card';
import { flush } from '../../test/helpers';

describe('EmcCard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createCard(props: Partial<EmcCard> = {}): EmcCard {
    const el = new EmcCard();
    Object.assign(el, props);
    el.innerHTML = '<p>Content</p>';
    document.body.appendChild(el);
    return el;
  }

  it('renders a card wrapper', async () => {
    const el = createCard();
    await flush(el);
    const card = el.shadowRoot!.querySelector('.card');
    expect(card).not.toBeNull();
    expect(card!.classList.contains('hover-enabled')).toBe(false);
  });

  it('applies the hover-enabled class when hover is set', async () => {
    const el = createCard({ hover: true });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.card')!.classList.contains('hover-enabled')).toBe(true);
  });

  it('projects slotted content', async () => {
    const el = createCard();
    await flush(el);
    expect(el.textContent).toBe('Content');
  });
});
