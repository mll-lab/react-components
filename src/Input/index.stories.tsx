import { Story } from '@storybook/react';
import { InputNumber } from 'antd';
import React from 'react';

import { Input, InputNumberProps, InputProps } from './index';

export default {
  title: 'Input',
  component: Input,
  onChange: { action: 'clicked' },
};

export const String: Story<InputProps> = (args) => <Input {...args} />;

export const Number: Story<InputNumberProps> = (args) => (
  <InputNumber min={1} max={10} defaultValue={3} {...args} />
);
