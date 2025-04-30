/**
 * Generates a random string with a length of 1-11 chars.
 */
export function randomString(): string {
  // Cut off the constant 0. from the beginning
  const fractionStart = 2;

  // Unequal distribution at the edges, but sufficiently random for the purposes of this function
  const randomLengthEnd = Math.round(Math.random() * 11) + 3;

  return Math.random().toString(36).substring(fractionStart, randomLengthEnd);
}
