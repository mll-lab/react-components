import { Theme } from '../theme';

import { RangeWithValueScale, RangeWithValueType } from './index';

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

/** Averaging 0.04 and 0.15 yields 0.09500000000000001. */
export function withoutFloatingPointNoise(value: number): number {
  return Number(value.toPrecision(12));
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
  scale,
}: {
  max: number;
  min: number;
  actualValue: number;
  expectedMin: number;
  expectedMax: number;
  bufferPercentage: number;
  scale: RangeWithValueScale;
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

  if (scale === 'logarithmic') {
    const logBuffer =
      (Math.log(maxValue) - Math.log(minValue)) * bufferPercentage;

    return {
      bufferedMin: Math.exp(Math.log(minValue) - logBuffer),
      bufferedMax: Math.exp(Math.log(maxValue) + logBuffer),
      range,
    };
  }

  const buffer = range * bufferPercentage;

  return {
    bufferedMin: minValue - buffer,
    bufferedMax: maxValue + buffer,
    range,
  };
}

export function positionOnScale({
  value,
  bufferedMin,
  bufferedMax,
  scale,
}: {
  value: number;
  bufferedMin: number;
  bufferedMax: number;
  scale: RangeWithValueScale;
}): number {
  if (bufferedMax === bufferedMin) {
    return 50;
  }

  const project = scale === 'logarithmic' ? Math.log : (raw: number) => raw;
  const from = project(bufferedMin);

  return ((project(value) - from) / (project(bufferedMax) - from)) * 100;
}
