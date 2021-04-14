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
  const s = range(hash, 75, 80);
  const l = range(hash, 40, 70);
  const opacity = '0.9';

  return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
}

function range(hash: number, min: number, max: number): number {
  const diff = max - min;
  const x = ((hash % diff) + diff) % diff;
  return x + min;
}

export function stringToHslaColor(string: string): string {
  return getHslColor(hashCode(string));
}
