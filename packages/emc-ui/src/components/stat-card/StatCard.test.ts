import { describe, it, expect, beforeEach } from 'vitest';
import { EmcStatCard } from './StatCard';
import { flush } from '../../test/helpers';

describe('EmcStatCard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createStatCard(props: Partial<EmcStatCard> = {}): EmcStatCard {
    const el = new EmcStatCard();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders label and value', async () => {
    const el = createStatCard({ label: 'Revenue', value: '$10k' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.stat-label')!.textContent).toBe('Revenue');
    expect(el.shadowRoot!.querySelector('.stat-value')!.textContent).toBe('$10k');
  });

  it('renders the sublabel when provided', async () => {
    const el = createStatCard({ sublabel: '+5%' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.stat-sublabel')!.textContent).toBe('+5%');
  });

  it('omits the sublabel when empty', async () => {
    const el = createStatCard();
    await flush(el);
    expect(el.shadowRoot!.querySelector('.stat-sublabel')).toBeNull();
  });

  it('renders an icon container with the accent class when an icon is set', async () => {
    const el = createStatCard({ icon: 'star', accent: 'green' });
    await flush(el);
    const icon = el.shadowRoot!.querySelector('.stat-icon')!;
    expect(icon).not.toBeNull();
    expect(icon.classList.contains('icon-green')).toBe(true);
  });

  it('omits the icon container when no icon is set', async () => {
    const el = createStatCard({ label: 'Revenue', value: '$10k' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.stat-icon')).toBeNull();
  });
});
