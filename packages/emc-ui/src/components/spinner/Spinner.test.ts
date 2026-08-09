import { describe, it, expect, beforeEach } from 'vitest';
import { EmcSpinner } from './Spinner';
import { flush } from '../../test/helpers';

describe('EmcSpinner', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createSpinner(props: Partial<EmcSpinner> = {}): EmcSpinner {
    const el = new EmcSpinner();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders an SVG spinner hidden from assistive tech', async () => {
    const el = createSpinner();
    await flush(el);
    const svg = el.shadowRoot!.querySelector('svg.spinner')!;
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies the configured size', async () => {
    const el = createSpinner({ size: 24 });
    await flush(el);
    const style = el.shadowRoot!.querySelector('svg.spinner')!.getAttribute('style');
    expect(style).toContain('width: 24px');
    expect(style).toContain('height: 24px');
  });

  it('applies a custom color', async () => {
    const el = createSpinner({ color: '#123456' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('svg.spinner')!.getAttribute('style')).toContain('#123456');
  });
});
