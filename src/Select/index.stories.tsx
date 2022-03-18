import { Story } from '@storybook/react';
import React from 'react';

import { Select, SelectProps } from './index';

export default {
  title: 'Select',
};

export const Default: Story<SelectProps<string>> = (args) => (
  <Select defaultValue="lucy" style={{ width: 120 }} {...args}>
    <Select.Option value="jack">Jack</Select.Option>
    <Select.Option value="lucy">Lucy</Select.Option>
    <Select.Option value="henry" disabled>
      Henry
    </Select.Option>
  </Select>
);

export const Multiple: Story<SelectProps<string>> = (args) => (
  <Select mode="multiple" defaultValue="lucy" style={{ width: 120 }} {...args}>
    <Select.Option value="jack">Jack</Select.Option>
    <Select.Option value="lucy">Lucy</Select.Option>
    <Select.Option value="henry" disabled>
      Henry
    </Select.Option>
  </Select>
);
