import { BarcodeOutlined } from '@ant-design/icons';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { Space } from '../Space';

import { NumericIDInput, NumericIDInputProps } from './NumericIDInput';
import {
  InputNumberProps,
  InputProps,
  PasswordProps,
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
    <Space vertical>
      <Input {...args} />
      <Input
        $inputStyle={{ background: 'red' }}
        $wrapperStyle={{ border: '5px green solid' }}
        {...args}
      />
      {/* TODO looks off */}
      <Input prefix={<BarcodeOutlined />} allowClear {...args} />
    </Space>
  );
};

export const Password: Story<PasswordProps> = function Password(args) {
  return <Input.Password {...args} />;
};

export const Search: Story<SearchProps> = function Search(args) {
  return <Input.Search {...args} />;
};

export const TextArea: Story<TextAreaProps> = function TextArea(args) {
  return (
    <Space>
      <Input.TextArea {...args} />
      <Input.TextArea
        $inputStyle={{ background: 'red' }}
        $wrapperStyle={{ border: '5px green solid' }}
        {...args}
      />
    </Space>
  );
};

export const Number: Story<InputNumberProps<number>> = function Number(args) {
  const [num, setNum] = useState<number | null>(0);

  return (
    <InputNumber<number>
      min={1}
      max={10}
      value={num}
      onChange={(val) => setNum(val)}
      {...args}
    />
  );
};

export const NumericID: Story<NumericIDInputProps> = function NumericID(args) {
  return <NumericIDInput {...args} />;
};
