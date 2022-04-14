import { classNames } from './classNames';

describe('classNames', () => {
  it('returns empty string for empty input', () => {
    expect(classNames([])).toEqual('');
    expect(classNames([undefined, null, ''])).toEqual('');
  });

  it('joins classnames', () => {
    expect(classNames([])).toEqual('');
    expect(classNames(['foo bar baz'])).toEqual('foo bar baz');
  });

  it('can handle mix of classnames and empty input', () => {
    expect(classNames(['foo', undefined, 'bar', false, null, ''])).toEqual(
      'foo bar',
    );
  });
});
