import { StoryFn } from '@storybook/react';
import React from 'react';

import { Empty } from './index';

export default {
  title: 'Empty',
  component: Empty,
};

export const Default: StoryFn = function Default(args) {
  return <Empty {...args} />;
};
