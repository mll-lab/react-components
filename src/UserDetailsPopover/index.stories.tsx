import { Story } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';

import { Form } from '../Form';
import { Space } from '../Space';

import { UserAvatarWithDetailsPopover, UserDetailsPopover } from './index';

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

export const Default: Story = function Link(args) {
  const [calledOnOpen, setCalledOnOpen] = useState(false);
  const handleOnOpen = useCallback(() => setCalledOnOpen(true), []);
  return (
    <Space
      direction="vertical"
      align="center"
      style={{
        marginLeft: 100,
      }}
    >
      <Form.Item label="onOpen-Callback was called">
        {calledOnOpen ? 'Yes' : 'No'}
      </Form.Item>
      <UserAvatarWithDetailsPopover
        acronym={args.acronym}
        loading={args.loading}
        onOpen={handleOnOpen}
        user={{
          acronym: args.acronym,
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          userName: args.userName,
          inactive: args.inactive,
        }}
      />
    </Space>
  );
};

export const WithCustomChildren: Story = function Link(args) {
  const userProps = useMemo(
    () => ({
      acronym: args.acronym,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      userName: args.userName,
      inactive: args.inactive,
    }),
    [args],
  );

  return (
    <Space
      direction="vertical"
      align="center"
      style={{
        marginLeft: 100,
      }}
    >
      <UserDetailsPopover loading={args.loading} user={userProps}>
        {args.userName}
      </UserDetailsPopover>
    </Space>
  );
};
