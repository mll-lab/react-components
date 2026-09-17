export type RangeWithValueScale = 'linear' | 'logarithmic';

/** On a logarithmic scale, distances are ratios and the buffer is a factor. */
export function projectOntoScale(
  value: number,
  scale: RangeWithValueScale,
): number {
  return scale === 'logarithmic' ? Math.log(value) : value;
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
  scaleSpan: number;
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

  const projectedMin = projectOntoScale(minValue, scale);
  const projectedMax = projectOntoScale(maxValue, scale);
  const scaleSpan = projectedMax - projectedMin;
  const buffer = scaleSpan * bufferPercentage;

  if (scale === 'logarithmic') {
    return {
      bufferedMin: Math.exp(projectedMin - buffer),
      bufferedMax: Math.exp(projectedMax + buffer),
      scaleSpan,
    };
  }

  return {
    bufferedMin: projectedMin - buffer,
    bufferedMax: projectedMax + buffer,
    scaleSpan,
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

  const from = projectOntoScale(bufferedMin, scale);

  return (
    ((projectOntoScale(value, scale) - from) /
      (projectOntoScale(bufferedMax, scale) - from)) *
    100
  );
}

/** A geometric mean is rarely representable, so it follows the decimals of its bounds. */
export function meanOfScale({
  expectedMin,
  expectedMax,
  scale,
}: {
  expectedMin: number;
  expectedMax: number;
  scale: RangeWithValueScale;
}): number {
  if (scale !== 'logarithmic') {
    return (expectedMin + expectedMax) / 2;
  }

  const decimals = Math.max(
    decimalsOf(expectedMin),
    decimalsOf(expectedMax),
    MINIMUM_MEAN_DECIMALS,
  );

  return Number(Math.sqrt(expectedMin * expectedMax).toFixed(decimals));
}

const MINIMUM_MEAN_DECIMALS = 2;
const EXPONENTIAL_MEAN_DECIMALS = 12;

function decimalsOf(value: number): number {
  const text = value.toString();
  if (text.includes('e')) {
    return EXPONENTIAL_MEAN_DECIMALS;
  }

  return text.split('.')[1]?.length ?? 0;
}
