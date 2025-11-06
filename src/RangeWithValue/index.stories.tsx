import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { RangeWithValue } from './index';

export default {
  title: 'RangeWithValue',
  component: RangeWithValue,
  argTypes: {
    expectedMin: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
    },
    expectedMax: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
    },
    actualValue: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
    },
    rangeType: {
      control: { type: 'select', options: ['closed', 'open-ended'] },
    },
    showMean: {
      control: { type: 'boolean' },
    },
  },
};

const Template: StoryFn<{
  expectedMin: number;
  expectedMax: number;
  actualValue: number;
  rangeType: 'closed' | 'open-ended';
  showMean: boolean;
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
