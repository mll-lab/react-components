import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Divider, DividerProps } from './index';

export default {
  title: 'Divider',
};

export const Default: StoryFn<DividerProps> = function Default(args) {
  return (
    <Divider orientation="left" {...args}>
      Left Text
    </Divider>
  );
};
