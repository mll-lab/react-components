import { uniq } from 'lodash';

import { stringToHslaColor } from './utils';

const randomString = Math.random().toString(36).substring(2, 5);

describe('stringToHslaColor', () => {
  it.each(['test', 'test'])(
    'is a pure function returning the same hsla for the same string',
    (testString) => {
      expect(stringToHslaColor(testString)).toStrictEqual(
        'hsla(58, 78%, 68%, 0.9)',
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
    expect(isValidColor(stringToHslaColor(randomString))).toBe(true);
  });
});

function isValidColor(color: string): boolean {
  // Use the browser's validation. Create a dummy HTML element, assign the color and check if it's set.
  const element = document.createElement('div');
  element.style.borderColor = '';
  element.style.borderColor = color;
  return element.style.borderColor.length !== 0;
}
