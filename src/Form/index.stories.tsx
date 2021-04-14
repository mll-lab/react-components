import { Story } from '@storybook/react';
import { Input } from 'antd';
import React from 'react';

import { Button } from '../index';

import { Form, FormProps } from './index';

export default {
  title: 'Form',
  argTypes: {
    bordered: { control: 'boolean' },
    loading: { control: 'boolean' },
    onFinish: { action: 'clicked' },
    onFinishFailed: { action: 'clicked' }
  },
};
export const Default: Story<FormProps<string>> = (args) => (
  <Form
    name="basic"
    {...args}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username.' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password.' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form.Item>
  </Form>
);
