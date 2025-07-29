import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

import { useTheme } from '../theme';

import {
  Container,
  DownwardLine,
  Label,
  LabelWrapper,
  RangeLine,
  Scale,
  ValuePoint,
} from './components';
import { colorByRange, getBufferedRange, widthOfValuePoint } from './utils';

export type RangeWithValueType = 'closed' | 'open-ended';

export type RangeWithValueProps = {
  expectedMin: number;
  expectedMax: number;
  actualValue: number;
  rangeType: RangeWithValueType;
  bufferPercentage?: number;
};

export function RangeWithValue({
  expectedMin,
  expectedMax,
  actualValue,
  rangeType,
  bufferPercentage = 0.1,
}: RangeWithValueProps) {
  const theme = useTheme();

  const rangeValues = getBufferedRange({
    max: Math.max(expectedMax, actualValue),
    min: Math.min(expectedMin, actualValue),
    actualValue,
    expectedMin,
    expectedMax,
    bufferPercentage,
  });
  const warnThreshold = rangeValues.range * bufferPercentage;
  const isRangeZero = expectedMin === expectedMax;
  const isNearMin = !isRangeZero && actualValue <= expectedMin + warnThreshold;
  const isNearMax = !isRangeZero && actualValue >= expectedMax - warnThreshold;
  const isOutOfRange = actualValue < expectedMin || actualValue > expectedMax;

  const percentage = (val: number) => {
    if (isRangeZero) {
      return 50; // Special case: range 0 -> always centered
    }

    return (
      ((val - rangeValues.bufferedMin) /
        (rangeValues.bufferedMax - rangeValues.bufferedMin)) *
      100
    );
  };

  const valuePointWidth = widthOfValuePoint(actualValue);
  const valueColor = colorByRange({
    isOutOfRange,
    isNearMin,
    isNearMax,
    rangeType,
    theme,
  });

  return (
    <Container>
      <Scale>
        <RangeLine left={`${percentage(expectedMin)}%`} />
        <RangeLine left={`${percentage(expectedMax)}%`} />
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
        <Label left={`calc(${percentage(expectedMin)}% - 14px)`}>
          {expectedMin}
        </Label>
        <Label left={`calc(${percentage(expectedMax)}% - 14px)`}>
          {expectedMax}
        </Label>
      </LabelWrapper>
    </Container>
  );
}
