import { Story } from '@storybook/react';
import React from 'react';

import { Popconfirm, PopconfirmProps } from './index';

export default {
  title: 'Popconfirm',
  argTypes: {
    title: {
      control: 'string',
      defaultValue: 'Are you sure to delete this task?',
    },
  },
};

export const Default: Story<PopconfirmProps> = function Default(args) {
  return (
    <Popconfirm okText="Yes" cancelText="No" {...args}>
      <button type="button">Delete</button>
    </Popconfirm>
  );
};
