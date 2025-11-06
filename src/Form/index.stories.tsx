import { StoryFn } from '@storybook/react-webpack5';
import { Input } from 'antd';
import React from 'react';

import { Button } from '../index';

import { Form, FormProps } from './index';

export default {
  title: 'Form',
  args: {
    bordered: false,
    loading: false,
  },
  argTypes: {
    onFinish: { action: 'clicked' },
    onFinishFailed: { action: 'clicked' },
  },
};

type FormValues = {
  username: string;
  password: string;
};

export const Default: StoryFn<FormProps<FormValues>> = function Default(args) {
  return (
    <Form<FormValues>
      name="basic"
      {...args}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
    >
      <Form.Item<FormValues>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FormValues>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password.' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FormValues> wrapperCol={{ span: 21, offset: 3 }}>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};
