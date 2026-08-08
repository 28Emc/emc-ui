import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const truthy = true;
    const falsy = false;
    expect(cn('foo', truthy && 'bar')).toBe('foo bar');
    expect(cn('foo', falsy && 'bar')).toBe('foo');
  });

  it('handles tailwind conflicts with twMerge', () => {
    expect(cn('p-2 p-4')).toBe('p-4');
    expect(cn('text-red-500 text-blue-500')).toBe('text-blue-500');
  });

  it('handles objects', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo');
  });

  it('handles arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles mixed arguments', () => {
    expect(cn('foo', { bar: true }, ['baz'])).toBe('foo bar baz');
  });

  it('handles empty arguments', () => {
    expect(cn()).toBe('');
  });

  it('handles null/undefined', () => {
    expect(cn(null, undefined, 'foo')).toBe('foo');
  });
});
