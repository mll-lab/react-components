import { indeterminate } from './index';

describe('indeterminate', () => {
  it.each([null, undefined, []])('returns false on empty values', (value) => {
    expect(indeterminate(value)).toBe(false);
  });

  it('returns false on all truthy values', () => {
    expect(indeterminate([true])).toBe(false);
    expect(indeterminate([true, true])).toBe(false);
  });

  it('returns false on all falsy values', () => {
    expect(indeterminate([false])).toBe(false);
    expect(indeterminate([false, false])).toBe(false);
    expect(indeterminate([null])).toBe(false);
    expect(indeterminate([null, undefined])).toBe(false);
    expect(indeterminate([false, null, undefined])).toBe(false);
  });

  it('returns true on mixed values', () => {
    expect(indeterminate([true, false])).toBe(true);
    expect(indeterminate([true, null])).toBe(true);
    expect(indeterminate([true, false, null, undefined])).toBe(true);
  });
});
