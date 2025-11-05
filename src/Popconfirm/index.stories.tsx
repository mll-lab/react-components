import { StoryFn } from '@storybook/react';
import React from 'react';

import { Popconfirm, PopconfirmProps } from './index';

export default {
  title: 'Popconfirm',
  args: {
    title: 'Are you sure to delete this task?',
  },
};

export const Default: StoryFn<PopconfirmProps> = function Default(args) {
  return (
    <Popconfirm okText="Yes" cancelText="No" {...args}>
      <button type="button">Delete</button>
    </Popconfirm>
  );
};
