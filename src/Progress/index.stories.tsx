import { StoryFn } from '@storybook/react';
import React from 'react';

import { Progress, ProgressProps } from './index';

export default {
  title: 'Progress',
  component: Progress,
  args: {
    percent: 22,
  },
};

export const Default: StoryFn<ProgressProps> = function Default(args) {
  return <Progress {...args} />;
};
