export type RangeWithValueScale = 'linear' | 'logarithmic';

/** Averaging 0.04 and 0.15 yields 0.09500000000000001. */
export function withoutFloatingPointNoise(value: number): number {
  return Number(value.toPrecision(12));
}

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

const DECADES_WITHOUT_SUBDIVISION = 4;
const TARGET_LINEAR_TICKS = 6;

/**
 * Ticks make the scale readable and its type visible: evenly spaced when
 * linear, crowding towards the lower bound when logarithmic.
 */
export function ticksOfScale({
  bufferedMin,
  bufferedMax,
  scale,
}: {
  bufferedMin: number;
  bufferedMax: number;
  scale: RangeWithValueScale;
}): Array<number> {
  const ticks =
    scale === 'logarithmic'
      ? logarithmicTicks(bufferedMin, bufferedMax)
      : linearTicks(bufferedMin, bufferedMax);

  return ticks
    .filter((value) => value >= bufferedMin && value <= bufferedMax)
    .map(withoutFloatingPointNoise);
}

const LABELLED_SPAN_IN_DECADES = 1;

/** Below one decade the bounds and the mean already fill the label row. */
export function scaleHasTickLabels({
  bufferedMin,
  bufferedMax,
  scale,
}: {
  bufferedMin: number;
  bufferedMax: number;
  scale: RangeWithValueScale;
}): boolean {
  return (
    scale !== 'logarithmic' ||
    Math.log10(bufferedMax / bufferedMin) >= LABELLED_SPAN_IN_DECADES
  );
}

const SUBDIVISIONS = [1, 2, 3, 5, 7];
const SUBDIVISIONS_OF_A_NARROW_WINDOW = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function logarithmicTicks(
  bufferedMin: number,
  bufferedMax: number,
): Array<number> {
  const firstDecade = Math.floor(Math.log10(bufferedMin));
  const decadeCount = Math.ceil(Math.log10(bufferedMax)) - firstDecade + 1;

  return Array.from(
    { length: decadeCount },
    (_, index) => firstDecade + index,
  ).flatMap((decade) =>
    logarithmicSubdivisions(bufferedMin, bufferedMax, decadeCount).map(
      (multiple) => multiple * 10 ** decade,
    ),
  );
}

/** Unlabelled strokes may sit denser, and a narrow window needs them to read as a scale. */
function logarithmicSubdivisions(
  bufferedMin: number,
  bufferedMax: number,
  decadeCount: number,
): Array<number> {
  if (decadeCount > DECADES_WITHOUT_SUBDIVISION) {
    return [1];
  }

  return scaleHasTickLabels({
    bufferedMin,
    bufferedMax,
    scale: 'logarithmic',
  })
    ? SUBDIVISIONS
    : SUBDIVISIONS_OF_A_NARROW_WINDOW;
}

function linearTicks(bufferedMin: number, bufferedMax: number): Array<number> {
  const step = roundedStep((bufferedMax - bufferedMin) / TARGET_LINEAR_TICKS);
  const firstTick = Math.ceil(bufferedMin / step);
  const tickCount = Math.floor(bufferedMax / step) - firstTick + 1;

  return Array.from(
    { length: Math.max(tickCount, 0) },
    (_, index) => (firstTick + index) * step,
  );
}

/** Nobody reads a tick at 0.0574, so steps are 1, 2 or 5 times a power of ten. */
function roundedStep(roughStep: number): number {
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const fraction = roughStep / magnitude;
  if (fraction < 1.5) {
    return magnitude;
  }
  if (fraction < 3) {
    return 2 * magnitude;
  }
  if (fraction < 7) {
    return 5 * magnitude;
  }

  return 10 * magnitude;
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
