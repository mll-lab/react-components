import { Story } from '@storybook/react';
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

export const Password: Story<PasswordProps> = function Password(args) {
  return <Input.Password {...args} />;
};

export const Search: Story<SearchProps> = function Search(args) {
  return <Input.Search {...args} />;
};

export const TextArea: Story<TextAreaProps> = function TextArea(args) {
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
