import { formatHold } from './formatHold';

describe('formatHold', () => {
  it('pads every part to two digits', () => {
    expect(formatHold({ seconds: 10 })).toBe('00:00:10');
  });

  it('carries seconds over into minutes', () => {
    expect(formatHold({ seconds: 600 })).toBe('00:10:00');
  });

  it('carries minutes over into hours', () => {
    expect(formatHold({ seconds: 3661 })).toBe('01:01:01');
  });

  it('keeps all digits of an hour count beyond two digits', () => {
    expect(formatHold({ seconds: 360000 })).toBe('100:00:00');
  });

  it('marks an indefinite hold as infinity rather than a large duration', () => {
    expect(formatHold({ indefinite: true })).toBe('∞');
  });
});
