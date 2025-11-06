import { BarcodeOutlined } from '@ant-design/icons';
import { StoryFn } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { Button } from '../Button';
import { Form } from '../Form';
import { Space } from '../Space';

import { NumericIDInput, NumericIDInputProps } from './NumericIDInput';
import {
  InputNumberProps,
  InputProps,
  PasswordProps,
  SearchProps,
} from './common';

import { Input, InputNumber, TextAreaProps } from './index';

export default {
  title: 'Input',
  onChange: { action: 'clicked' },
};

export const Text: StoryFn<InputProps> = function Text(args) {
  return (
    <Space vertical>
      <Input {...args} />
      <Input
        $inputStyle={{ background: 'red' }}
        $wrapperStyle={{ border: '5px green solid' }}
        {...args}
      />
      <Input prefix={<BarcodeOutlined />} allowClear {...args} />
    </Space>
  );
};

export const Password: StoryFn<PasswordProps> = function Password(args) {
  return <Input.Password {...args} />;
};

export const Search: StoryFn<SearchProps> = function Search(args) {
  return <Input.Search {...args} />;
};

export const TextArea: StoryFn<TextAreaProps> = function TextArea(args) {
  const [minRows, setMinRows] = React.useState(1);

  return (
    <Space block align="start">
      <Space vertical>
        <Form
          layout="vertical"
          wrapperCol={{ span: 12 }}
          labelCol={{ span: 12 }}
          labelAlign="left"
        >
          <Form.Item label="Input with minRows">
            <Space>
              <Input.TextArea
                autoSize={{
                  minRows,
                }}
                $wrapperStyle={{ width: '200px' }}
                {...args}
              />
              <Button onClick={() => setMinRows((prev) => prev + 1)}>
                Increase minRows
              </Button>
              <Button
                onClick={() => setMinRows((prev) => (prev <= 1 ? 1 : prev - 1))}
              >
                Decrease minRows
              </Button>
            </Space>
          </Form.Item>
          <Form.Item label="TextArea with allowClear">
            <Input.TextArea allowClear {...args} />
          </Form.Item>
          <Form.Item label="Input with inputStyle and wrapperStyle">
            <Input.TextArea
              $inputStyle={{ background: 'red' }}
              $wrapperStyle={{ border: '5px green solid', width: '200px' }}
              {...args}
            />
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
};

export const Number: StoryFn<InputNumberProps<number>> = function Number(args) {
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

export const NumericID: StoryFn<NumericIDInputProps> = function NumericID(
  args,
) {
  return <NumericIDInput {...args} />;
};
