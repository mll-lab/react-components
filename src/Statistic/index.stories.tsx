import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Statistic } from './index';

export default {
  title: 'Statistic',
};

export const Default: StoryFn = function Default(args) {
  return <Statistic title="Test" value={93} suffix="/ 100" {...args} />;
};
