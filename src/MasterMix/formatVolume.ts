import { formatGermanNumber } from '@mll-lab/js-utils';

export function formatVolume(volume: number): string {
  return formatGermanNumber(volume, { maximumFractionDigits: 2 });
}
