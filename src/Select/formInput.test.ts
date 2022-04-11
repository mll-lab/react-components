import { objectToFormInputOptions, toFormInputOption } from './formInput';

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

describe('toFormInputOption', () => {
  it('should generate options for redux from input field', () => {
    expect(toFormInputOption('foo')).toEqual({
      label: 'foo',
      value: 'foo',
    });
  });
});
