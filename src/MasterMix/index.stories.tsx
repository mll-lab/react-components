import { Story } from '@storybook/react';
import React from 'react';

import { Ingredient, MasterMixProps } from './types';

import { MasterMix } from './index';

export default {
  title: 'MasterMix',
};

const ingredients: Array<Ingredient> = [
  { key: 1, title: 'Water', volume: 79.5 },
  { key: 2, title: 'Primer Fordward', volume: 9.2 },
  { key: 3, title: 'Primer Reverse', volume: 9 },
  { key: 4, title: 'Probe', volume: 2.5 },
];
const name = 'Example';
const count = 7;

export const AbsolutePipettingLoss: Story<MasterMixProps> = function Default() {
  return (
    <MasterMix
      name={name}
      count={count}
      ingredients={ingredients}
      pipettingLoss={{ type: 'absolute', count: 2 }}
    />
  );
};

export const PipettingLossByFactor: Story<MasterMixProps> = function Default() {
  return (
    <MasterMix
      name={name}
      count={count}
      ingredients={ingredients}
      pipettingLoss={{ type: 'factor', factor: 0.1 }}
    />
  );
};
