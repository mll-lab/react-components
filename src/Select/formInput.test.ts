import {
  mapToFormInputOptions,
  objectToFormInputOptions,
  toFormInputOption,
} from './formInput';

describe('objectToFormInputOptions', () => {
  it('converts an object with string keys', () => {
    expect(
      objectToFormInputOptions({
        foo: 'A descriptive label',
      }),
    ).toEqual([
      {
        value: 'foo',
        label: 'A descriptive label',
      },
    ]);
  });

  it('converts an object with int keys to strings, because JavaScript works that way', () => {
    expect(
      objectToFormInputOptions({
        1: 'A descriptive label',
      }),
    ).toEqual([
      {
        value: '1',
        label: 'A descriptive label',
      },
    ]);
  });
});

describe('mapToFormInputOptions', () => {
  it('converts a map with boolean keys', () => {
    expect(
      mapToFormInputOptions(
        new Map([
          [true, 'Yes'],
          [false, 'No'],
          [null, 'Maybe'],
        ]),
      ),
    ).toEqual([
      {
        value: true,
        label: 'Yes',
      },
      {
        value: false,
        label: 'No',
      },
      {
        value: null,
        label: 'Maybe',
      },
    ]);
  });
});

describe('toFormInputOption', () => {
  it('should generate options for redux from input field', () => {
    expect(toFormInputOption('foo')).toEqual({
      label: 'foo',
      value: 'foo',
    });
  });
});
