import { Story } from '@storybook/react';
import React from 'react';

import { NumericIDInput, NumericIDInputProps } from './NumericIDInput';
import { InputNumberProps, InputProps } from './common';

import { Input, InputNumber } from './index';

export default {
  title: 'Input',
  onChange: { action: 'clicked' },
};

export const Text: Story<InputProps> = (args) => <Input {...args} />;

export const Number: Story<InputNumberProps> = (args) => (
  <InputNumber min={1} max={10} defaultValue={3} {...args} />
);

export const NumericID: Story<NumericIDInputProps> = (args) => (
  <NumericIDInput {...args} />
);
