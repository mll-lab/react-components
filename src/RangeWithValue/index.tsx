import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { PALETTE, THEME } from '../theme';

export type RangeType = 'closed' | 'open-ended';

function colorByRange(
  isOutOfRange: boolean,
  isNearMin: boolean,
  isNearMax: boolean,
  rangeType: RangeType,
) {
  if (isOutOfRange) {
    return THEME.errorColor;
  }
  if (rangeType === 'closed' && (isNearMin || isNearMax)) {
    return THEME.warningColor;
  }
  if (rangeType === 'open-ended' && isNearMax) {
    return THEME.warningColor;
  }

  return THEME.successColor;
}

function widthOfValuePoint(value: number) {
  const { length } = String(value);
  const minWidth = 20;
  const widthPerChar = 5;

  return Math.round(minWidth + (length - 1) * widthPerChar);
}

const Container = styled.div`
  position: relative;
  padding: 30px 10px 10px;
`;

const Scale = styled.div`
  height: 8px;
  background: ${THEME.backgroundColor};
  border-radius: 4px;
  position: relative;
`;

const RangeLine = styled.div<{ left: string }>`
  position: absolute;
  left: ${({ left }) => left};
  top: 6px;
  width: 1px;
  height: 10px;
  background: ${THEME.borderColor};
`;

const ValuePoint = styled.div<{
  left: string;
  width: number;
  color: string;
}>`
  position: absolute;
  left: ${({ left }) => left};
  top: -26px;
  width: ${({ width }) => width}px;
  height: 24px;
  border-radius: 8px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${PALETTE.white};
  text-align: center;
`;

const DownwardLine = styled.div<{
  color: string;
}>`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  width: 2px;
  height: 7px;
  background: ${({ color }) => color};
`;

const LabelWrapper = styled.div`
  position: relative;
  height: 18px;
`;

const Label = styled.span<{ left: string }>`
  position: absolute;
  left: ${({ left }) => left};
  top: 9px;
  min-width: 28px;
  text-align: center;
  font-size: 12px;
`;

// Always ensure the value is visible and add 10% padding to the range
function getBufferedRange({
  max,
  min,
  actualValue,
  expectedMin,
  expectedMax,
}: {
  max: number;
  min: number;
  actualValue: number;
  expectedMin: number;
  expectedMax: number;
}) {
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
  const buffer = range * 0.1;

  return {
    bufferedMin: minValue - buffer,
    bufferedMax: maxValue + buffer,
    range,
  };
}

export function RangeWithValue({
  expectedMin,
  expectedMax,
  actualValue,
  rangeType,
}: {
  expectedMin: number;
  expectedMax: number;
  actualValue: number;
  rangeType: RangeType;
}) {
  const rangeValues = getBufferedRange({
    max: Math.max(expectedMax, actualValue),
    min: Math.min(expectedMin, actualValue),
    actualValue,
    expectedMin,
    expectedMax,
  });
  const warnThreshold = rangeValues.range * 0.1;
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
  const valueColor = colorByRange(
    isOutOfRange,
    isNearMin,
    isNearMax,
    rangeType,
  );

  return (
    <Container>
      <Scale>
        <RangeLine left={`${percentage(expectedMin)}%`} />
        <RangeLine left={`${percentage(expectedMax)}%`} />
        <Tooltip
          title={(() => {
            if (isOutOfRange) {
              return (
                <span style={{ color: THEME.errorColor }}>
                  <ExclamationCircleOutlined /> Außerhalb des Bereichs
                </span>
              );
            }
            if (
              (rangeType === 'closed' && (isNearMin || isNearMax)) ||
              (rangeType === 'open-ended' && isNearMax)
            ) {
              return (
                <span style={{ color: THEME.warningColor }}>
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
