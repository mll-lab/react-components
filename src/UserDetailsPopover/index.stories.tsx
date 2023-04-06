import { UserOutlined } from '@ant-design/icons';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { Avatar, UserAvatar } from '../Avatar';
import { Form } from '../Form';
import { Space } from '../Space';

import { UserDetailsPopover } from './index';

export default {
  title: 'UserPopover',
  argTypes: {
    acronym: { control: { type: 'text' }, defaultValue: 'JD' },
    email: { control: { type: 'text' }, defaultValue: 'john.doe@mll.com' },
    firstName: { control: { type: 'text' }, defaultValue: 'John' },
    lastName: { control: { type: 'text' }, defaultValue: 'Doe' },
    userName: { control: { type: 'text' }, defaultValue: 'jdoe' },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    inactive: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};

export const Basic: Story = function Link(args) {
  const [calledOnOpen, setCalledOnOpen] = useState(false);
  return (
    <Space
      direction="vertical"
      align="center"
      style={{
        marginLeft: 100,
      }}
    >
      <UserDetailsPopover
        loading={args.loading}
        user={{
          acronym: args.acronym,
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          userName: args.userName,
          inactive: args.inactive,
        }}
        onOpen={() => setCalledOnOpen(true)}
      >
        {args.acronym ? (
          <UserAvatar username={args.acronym} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </UserDetailsPopover>
      <Form.Item label="onOpen-Callback was called">
        {calledOnOpen ? 'Yes' : 'No'}
      </Form.Item>
    </Space>
  );
};
