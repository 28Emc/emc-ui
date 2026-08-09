import { describe, it, expect, beforeEach } from 'vitest';
import { EmcDivider } from './Divider';
import { flush } from '../../test/helpers';

describe('EmcDivider', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createDivider(props: Partial<EmcDivider> = {}): EmcDivider {
    const el = new EmcDivider();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders a horizontal solid hr by default', async () => {
    const el = createDivider();
    await flush(el);
    const hr = el.shadowRoot!.querySelector('hr')!;
    expect(hr.classList.contains('horizontal')).toBe(true);
    expect(hr.classList.contains('solid')).toBe(true);
  });

  it('renders the vertical orientation', async () => {
    const el = createDivider({ orientation: 'vertical' });
    await flush(el);
    const hr = el.shadowRoot!.querySelector('hr')!;
    expect(hr.classList.contains('vertical')).toBe(true);
    expect(el.shadowRoot!.querySelector('.divider')!.classList.contains('vertical')).toBe(true);
  });

  it('applies the dashed variant', async () => {
    const el = createDivider({ variant: 'dashed' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('hr')!.classList.contains('dashed')).toBe(true);
  });

  it('renders an optional label', async () => {
    const el = createDivider({ label: 'Section' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.divider-label')!.textContent).toBe('Section');
  });
});
