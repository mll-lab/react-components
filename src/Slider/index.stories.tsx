import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Slider, SliderSingleProps } from './index';

export default {
  title: 'Slider',
};

export const Default: StoryFn<SliderSingleProps> = function Default(args) {
  return <Slider defaultValue={30} {...args} />;
};
