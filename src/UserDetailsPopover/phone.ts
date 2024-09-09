export function callToLink(phone: string): string {
  if (!phone) {
    throw new Error('Could not create callto-Link because phone is empty');
  }

  return `callto:${phone}`;
}
