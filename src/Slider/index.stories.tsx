import { Story } from '@storybook/react';
import React from 'react';

import { Slider, SliderSingleProps } from './index';

export default {
  title: 'Slider',
};

export const Default: Story<SliderSingleProps> = (args) => (
  <Slider defaultValue={30} {...args} />
);
