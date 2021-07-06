import { isEqual } from 'lodash';

/**
 * Return a new array that does not contain the item at the specified index.
 */
export function withoutIndex<T>(
  array: Array<T>,
  indexToRemove: number,
): Array<T> {
  return array.filter((_, i) => i !== indexToRemove);
}

/**
 * Determines if the input arrays contain the same values.
 */
export function containSameValues(
  a: Array<unknown>,
  b: Array<unknown>,
): boolean {
  return isEqual(a.sort(), b.sort());
}

/**
 * A singleton empty array.
 *
 * Can be used as a default or fallback while maintaining referential equality.
 */
export const EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);

/**
 * A helper to construct contiguous arrays with conditional elements.
 *
 * @example const arr = ['x', ...insertIf(foo === 42, 'y', 'z')]
 */
export function insertIf<T>(
  condition: boolean,
  ...elements: Array<T>
): Array<T> {
  return condition ? elements : [];
}
