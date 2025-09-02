import React from 'react';

import { MasterMixIngredient, MasterMixProps } from './types';

import { MasterMix } from './index';

const ingredients: Array<MasterMixIngredient> = [
  { key: 1, title: 'Water', volume: 12 },
  { key: 2, title: 'Primer Forward', volume: 1 },
  { key: 3, title: 'Primer Reverse', volume: 1 },
  { key: 4, title: 'Probe', volume: 1 },
];

export default {
  title: 'MasterMix',
  component: MasterMix,
  args: {
    name: 'Example Mix',
    count: 20,
    ingredients,
    lossType: 'factorWithMinimum',
    lossValue: 0.1,
    minPositions: 2,
  },
  argTypes: {
    name: { control: 'text' },
    count: { control: { type: 'number', min: 1 } },
    ingredients: { control: 'object' },
    lossType: {
      control: 'radio',
      options: ['absolute', 'factor', 'factorWithMinimum'],
    },
    lossValue: {
      control: { type: 'number', min: 0, step: 0.1 },
    },
    minPositions: {
      control: { type: 'number', min: 0 },
      if: { arg: 'lossType', eq: 'factorWithMinimum' },
    },
    pipettingLoss: {
      table: {
        disable: true,
      },
    },
  },
};

type StoryProps = MasterMixProps & {
  lossType: 'absolute' | 'factor' | 'factorWithMinimum';
  lossValue: number;
  minPositions?: number;
};

function Template({
  lossType = 'factorWithMinimum',
  lossValue = 0.1,
  minPositions = 2,
  ...props
}: StoryProps): React.ReactElement {
  let pipettingLoss;

  if (lossType === 'absolute') {
    pipettingLoss = { type: 'absolute', count: lossValue };
  } else if (lossType === 'factor') {
    pipettingLoss = { type: 'factor', factor: lossValue };
  } else {
    pipettingLoss = {
      type: 'factorWithMinimum',
      factor: lossValue,
      minPositions,
    };
  }

  return <MasterMix {...props} pipettingLoss={pipettingLoss} />;
}

export const Default = Template;
