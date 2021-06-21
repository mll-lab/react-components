import {
  objectToFormInputOptions,
  toFormInputOption,
} from './formInput';

describe('objectToFormInputOptions', () => {
  it('converts an object into from input options', () => {
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
});

describe('stringToFormInputOption', () => {
  it('should generate options for redux from input field', () => {
    expect(toFormInputOption('foo')).toEqual({
      label: 'foo',
      value: 'foo',
    });
  });
});
