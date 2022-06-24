function hashCode(string: string): number {
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < string.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

function getHslColor(hash: number): string {
  const h = range(hash, 0, 360);
  const s = range(hash, 50, 100);
  const l = range(hash, 20, 50);

  return `hsla(${h}, ${s}%, ${l}%, 1)`;
}

function range(hash: number, min: number, max: number): number {
  const diff = max - min;
  const x = ((hash % diff) + diff) % diff;

  return x + min;
}

export function stringToHslaColor(string: string): string {
  return getHslColor(hashCode(string));
}

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
