import { Story } from '@storybook/react';
import React from 'react';

import { Slider, SliderSingleProps } from './index';

export default {
  title: 'Slider',
};

export const Default: Story<SliderSingleProps> = function Default(args) {
  return <Slider defaultValue={30} {...args} />;
};
