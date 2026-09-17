import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { RangeWithValue } from './index';

export default {
  title: 'RangeWithValue',
  component: RangeWithValue,
  argTypes: {
    expectedMin: {
      control: { type: 'number', step: 0.001 },
    },
    expectedMax: {
      control: { type: 'number', step: 0.001 },
    },
    actualValue: {
      control: { type: 'number', step: 0.001 },
    },
    rangeType: {
      control: { type: 'select', options: ['closed', 'open-ended'] },
    },
    showMean: {
      control: { type: 'boolean' },
    },
    meanType: {
      control: { type: 'select', options: ['arithmetic', 'geometric'] },
    },
  },
};

const Template: StoryFn<{
  expectedMin: number;
  expectedMax: number;
  actualValue: number;
  rangeType: 'closed' | 'open-ended';
  showMean: boolean;
  meanType: 'arithmetic' | 'geometric';
}> = function Template(args) {
  return (
    <div style={{ width: 300 }}>
      <RangeWithValue {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  expectedMin: 10,
  expectedMax: 100,
  actualValue: 50,
  rangeType: 'closed',
  showMean: false,
};

export const ThreeDecimals = Template.bind({});
ThreeDecimals.args = {
  expectedMin: 0,
  expectedMax: 0.029,
  actualValue: 0.03,
  rangeType: 'open-ended',
  showMean: false,
};

export const EqualBounds = Template.bind({});
EqualBounds.args = {
  expectedMin: 0.029,
  expectedMax: 0.029,
  actualValue: 0.03,
  rangeType: 'open-ended',
  showMean: false,
};

export const InvalidBounds = Template.bind({});
InvalidBounds.args = {
  expectedMin: 0.029,
  expectedMax: 0.024,
  actualValue: 0.031,
  rangeType: 'open-ended',
  showMean: false,
};

export const MeanNeedsMoreDecimals = Template.bind({});
MeanNeedsMoreDecimals.args = {
  expectedMin: 0.04,
  expectedMax: 0.15,
  actualValue: 0.1,
  rangeType: 'closed',
  showMean: true,
};

export const GeometricMean = Template.bind({});
GeometricMean.args = {
  expectedMin: 0.038,
  expectedMax: 0.152,
  actualValue: 0.1,
  rangeType: 'closed',
  showMean: true,
  meanType: 'geometric',
};

export const MissingMeasurement = Template.bind({});
MissingMeasurement.args = {
  expectedMin: 0.04,
  expectedMax: 0.15,
  actualValue: NaN,
  rangeType: 'closed',
  showMean: false,
};

export const EqualBoundsMet = Template.bind({});
EqualBoundsMet.args = {
  expectedMin: 0,
  expectedMax: 0,
  actualValue: 0,
  rangeType: 'open-ended',
  showMean: false,
};
