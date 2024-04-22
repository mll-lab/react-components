import { uniq } from 'lodash';

import { randomString, stringToHslaColor } from './utils';

describe('stringToHslaColor', () => {
  it.each(['test', 'test'])(
    'is a pure function returning the same hsla for the same string',
    (testString) => {
      expect(stringToHslaColor(testString)).toStrictEqual(
        'hsla(58, 98%, 48%, 1)',
      );
    },
  );

  it('returns various hsla colors for various inputs', () => {
    const testStrings = ['t', 'te', 'tes', 'test'];
    expect(uniq(testStrings.map(stringToHslaColor)).length).toBe(
      testStrings.length,
    );
  });

  it('returns a valid color for a random string', () => {
    expect(isValidColor(stringToHslaColor(randomString()))).toBe(true);
  });
});

function isValidColor(color: string): boolean {
  // Use the browser's validation. Create a dummy HTML element, assign the color and check if it's set.
  const element = document.createElement('div');
  element.style.borderColor = '';
  element.style.borderColor = color;

  return element.style.borderColor.length !== 0;
}
