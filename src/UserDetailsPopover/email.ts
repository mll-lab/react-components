export function mailToLink(email: string): string {
  if (!email) {
    throw new Error('Could not create mailto-Link because email is empty');
  }

  return `mailto:${email}`;
}
