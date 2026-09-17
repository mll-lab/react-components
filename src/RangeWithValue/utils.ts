import { Theme } from '../theme';

import { RangeWithValueType } from './index';

export function colorByRange({
  isOutOfRange,
  isNearMin,
  isNearMax,
  rangeType,
  theme,
}: {
  isOutOfRange: boolean;
  isNearMin: boolean;
  isNearMax: boolean;
  rangeType: RangeWithValueType;
  theme: Theme;
}): string {
  if (isOutOfRange) {
    return theme.errorColor;
  }
  if (rangeType === 'closed' && (isNearMin || isNearMax)) {
    return theme.warningColor;
  }
  if (rangeType === 'open-ended' && isNearMax) {
    return theme.warningColor;
  }

  return theme.successColor;
}

export function widthOfValuePoint(value: number): number {
  const { length } = value.toString();
  const minWidth = 20;
  const widthPerChar = 5;

  return Math.round(minWidth + (length - 1) * widthPerChar);
}
