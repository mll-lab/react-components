import { mailToLink } from './email';

describe('mailToLink', () => {
  it('throws error when mail is empty ', () => {
    expect(() => mailToLink('')).toThrow(/empty/);
  });

  it('renders mailto link ', () => {
    const email = 'john.doe@mll.com';
    expect(mailToLink(email)).toBe(`mailto:${email}`);
  });
});
