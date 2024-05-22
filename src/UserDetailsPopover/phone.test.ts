import { callToLink } from './phone';

describe('callToLink', () => {
  it('throws error when phone is empty ', () => {
    expect(() => callToLink('')).toThrow(/empty/);
  });

  it('renders callto link ', () => {
    const phone = '123';
    expect(callToLink(phone)).toBe(`callto:${phone}`);
  });
});
