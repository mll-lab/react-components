import { Story } from '@storybook/react';
import React from 'react';

import { Popconfirm, PopconfirmProps } from './index';

export default {
  title: 'Popconfirm',
};

export const Default: Story<Omit<PopconfirmProps, 'title'>> = (args) => (
  <Popconfirm
    title="Are you sure to delete this task?"
    okText="Yes"
    cancelText="No"
    {...args}
  >
    <button type="button">Delete</button>
  </Popconfirm>
);
