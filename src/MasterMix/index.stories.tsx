import { Story } from '@storybook/react';
import React from 'react';

import { MasterMix, MasterMixIngredients, MasterMixParams } from './index';

export default {
  title: 'MasterMix',
};

const ingredients: MasterMixIngredients = [
  { key: 1, title: 'Water', volume: 79.5 },
  { key: 2, title: 'Primer Fordward', volume: 9.2 },
  { key: 3, title: 'Primer Reverse', volume: 9 },
  { key: 4, title: 'Probe', volume: 2.5 },
];
const name = 'Example';
const count = 7;

export const Default: Story<MasterMixParams> = function Default() {
  return <MasterMix name={name} count={count} ingredients={ingredients} />;
};
