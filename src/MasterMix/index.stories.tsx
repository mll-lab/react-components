import React, { ReactElement } from 'react';

import { MasterMixIngredient, PipettingLoss } from './types';

import { MasterMix } from './index';

const INGREDIENTS: Array<MasterMixIngredient> = [
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
    ingredients: INGREDIENTS,
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

const PER_REACTION_INGREDIENTS: Array<MasterMixIngredient> = [
  { key: 5, title: 'cDNA', volume: 5 },
];

type StoryProps = {
  name: string;
  count: number;
  ingredients: Array<MasterMixIngredient>;
  perReactionIngredients?: Array<MasterMixIngredient>;
  lossType: 'absolute' | 'factor' | 'factorWithMinimum';
  lossValue: number;
  minPositions?: number;
};

export function Default({
  lossType = 'factorWithMinimum',
  lossValue = 0.1,
  minPositions = 2,
  ...props
}: StoryProps): ReactElement {
  const pipettingLoss = ((): PipettingLoss => {
    switch (lossType) {
      case 'absolute':
        return { type: lossType, count: lossValue };
      case 'factor':
        return { type: lossType, factor: lossValue };
      case 'factorWithMinimum':
        return {
          type: lossType,
          factor: lossValue,
          minPositions,
        };
    }
  })();

  return <MasterMix {...props} pipettingLoss={pipettingLoss} />;
}

export function WithPerReactionIngredients(props: StoryProps): ReactElement {
  return (
    <Default {...props} perReactionIngredients={PER_REACTION_INGREDIENTS} />
  );
}

export function Recipe({ name, ingredients }: StoryProps): ReactElement {
  return (
    <MasterMix
      name={name}
      mode="recipe"
      ingredients={ingredients}
      perReactionIngredients={PER_REACTION_INGREDIENTS}
    />
  );
}
