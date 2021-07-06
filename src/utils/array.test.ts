import { containSameValues, insertIf, withoutIndex } from './array';

describe('withoutIndex', () => {
  it('handles empty arrays', () => {
    expect(withoutIndex([], 1)).toEqual([]);
  });

  it('removes the item at the given index without mutating the original', () => {
    const original = [1, 2, 3];
    expect(withoutIndex(original, 0)).toEqual([2, 3]);
    expect(original).toEqual([1, 2, 3]);
  });
});

describe('containSameValues', () => {
  it('handles empty arrays', () => {
    expect(containSameValues([], [])).toEqual(true);
  });

  it('ignores order', () => {
    expect(containSameValues([1, 2], [2, 1])).toEqual(true);
  });

  it('respects type', () => {
    expect(containSameValues([1], ['1'])).toEqual(false);
  });

  it('does not say subsets are equal type', () => {
    expect(containSameValues([1, 2], [1])).toEqual(false);
    expect(containSameValues([1], [1, 2])).toEqual(false);
  });
});

describe('insertIf', () => {
  it('returns the elements if the condition is true', () => {
    expect(insertIf(true, 1, 2)).toEqual([1, 2]);
  });

  it('returns an empty array if the condition is false', () => {
    expect(insertIf(false, 1, 2)).toEqual([]);
  });
});
