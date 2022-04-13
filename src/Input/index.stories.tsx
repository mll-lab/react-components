import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { NumericIDInput, NumericIDInputProps } from './NumericIDInput';
import { InputNumberProps, InputProps, TextAreaProps } from './common';

import { Input, InputNumber } from './index';

export default {
  title: 'Input',
  onChange: { action: 'clicked' },
};

export const Text: Story<InputProps> = (args) => <Input {...args} />;

export const TextArea: Story<TextAreaProps> = (args) => (
  <Input.TextArea {...args} />
);

export const Number: Story<InputNumberProps> = (args) => {
  const [num, setNum] = useState<number>(0);
  return (
    <InputNumber
      min={1}
      max={10}
      value={num}
      onChange={(val) =>
        setNum(typeof val !== 'number' ? parseInt(val, 10) : val)
      }
      {...args}
    />
  );
};

export const NumericID: Story<NumericIDInputProps> = (args) => (
  <NumericIDInput {...args} />
);
