import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

import { useTheme } from '../theme';

import {
  Container,
  DownwardLine,
  InvalidRange,
  Label,
  LabelWrapper,
  RangeLine,
  Scale,
  ValuePoint,
} from './components';
import {
  colorByRange,
  getBufferedRange,
  positionOnScale,
  widthOfValuePoint,
  withoutFloatingPointNoise,
} from './utils';

export type RangeWithValueType = 'closed' | 'open-ended';

export type RangeWithValueScale = 'linear' | 'logarithmic';

export type RangeWithValueProps = {
  expectedMin: number;
  expectedMax: number;
  actualValue: number;
  rangeType: RangeWithValueType;
  bufferPercentage?: number;
  showMean?: boolean;
  scale?: RangeWithValueScale;
};

export function RangeWithValue({
  expectedMin,
  expectedMax,
  actualValue,
  rangeType,
  bufferPercentage = 0.1,
  showMean,
  scale = 'linear',
}: RangeWithValueProps) {
  const theme = useTheme();

  const invalidInput = (() => {
    if (![expectedMin, expectedMax, actualValue].every(Number.isFinite)) {
      return `Keine gültigen Zahlenwerte: ${expectedMin} / ${expectedMax} / ${actualValue}`;
    }
    if (expectedMax < expectedMin) {
      return `Ungültige Grenzwerte: ${expectedMin} ist größer als ${expectedMax}`;
    }
    if (scale === 'logarithmic' && Math.min(expectedMin, actualValue) <= 0) {
      return `Keine logarithmische Skala für Werte kleiner oder gleich null: ${Math.min(
        expectedMin,
        actualValue,
      )}`;
    }

    return null;
  })();

  if (invalidInput) {
    return (
      <Container>
        <InvalidRange>
          <ExclamationCircleOutlined /> {invalidInput}
        </InvalidRange>
      </Container>
    );
  }

  const rangeValues = getBufferedRange({
    max: Math.max(expectedMax, actualValue),
    min: Math.min(expectedMin, actualValue),
    actualValue,
    expectedMin,
    expectedMax,
    bufferPercentage,
    scale,
  });
  const warnThreshold = rangeValues.range * bufferPercentage;
  const isRangeZero = expectedMin === expectedMax;
  const isNearMin = !isRangeZero && actualValue <= expectedMin + warnThreshold;
  const isNearMax = !isRangeZero && actualValue >= expectedMax - warnThreshold;
  const isOutOfRange = actualValue < expectedMin || actualValue > expectedMax;

  const percentage = (value: number) =>
    positionOnScale({
      value,
      bufferedMin: rangeValues.bufferedMin,
      bufferedMax: rangeValues.bufferedMax,
      scale,
    });

  const valuePointWidth = widthOfValuePoint(actualValue);
  const valueColor = colorByRange({
    isOutOfRange,
    isNearMin,
    isNearMax,
    rangeType,
    theme,
  });

  const meanValue =
    scale === 'logarithmic'
      ? Math.sqrt(expectedMin * expectedMax)
      : (expectedMin + expectedMax) / 2;

  return (
    <Container>
      <Scale>
        <RangeLine left={`${percentage(expectedMin)}%`} />
        {!isRangeZero && (
          <>
            <RangeLine left={`${percentage(expectedMax)}%`} />
            {showMean && (
              <RangeLine left={`calc(${percentage(meanValue)}% - 0.5px)`} />
            )}
          </>
        )}
        <Tooltip
          title={(() => {
            if (isOutOfRange) {
              return (
                <span style={{ color: theme.errorColor }}>
                  <ExclamationCircleOutlined /> Außerhalb des Bereichs
                </span>
              );
            }
            if (
              (rangeType === 'closed' && (isNearMin || isNearMax)) ||
              (rangeType === 'open-ended' && isNearMax)
            ) {
              return (
                <span style={{ color: theme.warningColor }}>
                  <ExclamationCircleOutlined /> Nahe am Grenzwert
                </span>
              );
            }

            return null;
          })()}
        >
          <ValuePoint
            left={`calc(${percentage(actualValue)}% - ${
              valuePointWidth / 2
            }px)`}
            width={valuePointWidth}
            color={valueColor}
          >
            {actualValue}
            <DownwardLine color={valueColor} />
          </ValuePoint>
        </Tooltip>
      </Scale>
      <LabelWrapper>
        <Label left={`${percentage(expectedMin)}%`}>
          {isRangeZero ? `= ${expectedMin}` : expectedMin}
        </Label>
        {!isRangeZero && (
          <>
            <Label left={`${percentage(expectedMax)}%`}>{expectedMax}</Label>
            {showMean && (
              <Label left={`${percentage(meanValue)}%`}>
                {withoutFloatingPointNoise(meanValue)}
              </Label>
            )}
          </>
        )}
      </LabelWrapper>
    </Container>
  );
}
