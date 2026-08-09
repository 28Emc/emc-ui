import { describe, it, expect, beforeEach } from 'vitest';
import { EmcSkeleton } from './Skeleton';
import { flush } from '../../test/helpers';

describe('EmcSkeleton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function createSkeleton(props: Partial<EmcSkeleton> = {}): EmcSkeleton {
    const el = new EmcSkeleton();
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  }

  it('renders a skeleton element hidden from assistive tech', async () => {
    const el = createSkeleton();
    await flush(el);
    const skeleton = el.shadowRoot!.querySelector('.skeleton')!;
    expect(skeleton).not.toBeNull();
    expect(skeleton.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies the variant class used by its CSS', async () => {
    const el = createSkeleton({ variant: 'circular' });
    await flush(el);
    expect(el.shadowRoot!.querySelector('.skeleton')!.classList.contains('circular')).toBe(true);
  });

  it('applies width and height styles', async () => {
    const el = createSkeleton({ width: '200px', height: '3rem' });
    await flush(el);
    const style = el.shadowRoot!.querySelector('.skeleton')!.getAttribute('style');
    expect(style).toContain('width: 200px');
    expect(style).toContain('height: 3rem');
  });
});
