import { Story } from '@storybook/react';
import { Input } from 'antd';
import React from 'react';

import { Radio } from './index';

export default {
  title: 'Radio',
  component: Input,
};

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

export const Default: Story = (args) => (
  <Radio.Group options={options} {...args} />
);

Default.argTypes = {
  optionType: {
    control: {
      type: 'inline-radio',
      options: ['default', 'button'],
      default: 'button',
    },
  },
};
