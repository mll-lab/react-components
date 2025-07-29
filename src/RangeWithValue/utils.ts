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

/** Always ensure the value is visible and add 10% padding to the range. */
export function getBufferedRange({
  max,
  min,
  actualValue,
  expectedMin,
  expectedMax,
  bufferPercentage,
}: {
  max: number;
  min: number;
  actualValue: number;
  expectedMin: number;
  expectedMax: number;
  bufferPercentage: number;
}): {
  bufferedMin: number;
  bufferedMax: number;
  range: number;
} {
  let minValue = min;
  let maxValue = max;
  if (actualValue < expectedMin) {
    minValue = actualValue;
    maxValue = expectedMax;
  } else if (actualValue > expectedMax) {
    minValue = expectedMin;
    maxValue = actualValue;
  }
  const range = maxValue - minValue;
  const buffer = range * bufferPercentage;

  return {
    bufferedMin: minValue - buffer,
    bufferedMax: maxValue + buffer,
    range,
  };
}
