import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { Space } from '../Space';

import { NumericIDInput, NumericIDInputProps } from './NumericIDInput';
import {
  InputNumberProps,
  InputProps,
  SearchProps,
  TextAreaProps,
} from './common';

import { Input, InputNumber } from './index';

export default {
  title: 'Input',
  onChange: { action: 'clicked' },
};

export const Text: Story<InputProps> = function Text(args) {
  return (
    <Space>
      <Input {...args} />
      <Input
        $inputStyle={{ background: 'red' }}
        $wrapperStyle={{ border: '5px green solid' }}
        {...args}
      />
    </Space>
  );
};

export const TextArea: Story<TextAreaProps> = function TextArea(args) {
  return <Input.TextArea {...args} />;
};

export const Search: Story<SearchProps> = function Search(args) {
  return <Input.Search {...args} />;
};

export const Number: Story<InputNumberProps> = function Number(args) {
  const [num, setNum] = useState<number | null>(0);

  return (
    <InputNumber
      min={1}
      max={10}
      value={num}
      onChange={(val) =>
        setNum(typeof val === 'string' ? parseInt(val, 10) : val)
      }
      {...args}
    />
  );
};

export const NumericID: Story<NumericIDInputProps> = function NumericID(args) {
  return <NumericIDInput {...args} />;
};
