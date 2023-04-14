import { Story } from '@storybook/react';
import React, { useMemo, useState } from 'react';

import { Form } from '../Form';
import { Space } from '../Space';

import { UserAvatarWithDetailsPopover, UserDetailsPopover } from './index';

export default {
  title: 'UserPopover',
  argTypes: {
    acronym: { control: { type: 'text' }, defaultValue: 'JD' },
    email: { control: { type: 'text' }, defaultValue: 'john.doe@mll.com' },
    firstname: { control: { type: 'text' }, defaultValue: 'John' },
    lastname: { control: { type: 'text' }, defaultValue: 'Doe' },
    username: { control: { type: 'text' }, defaultValue: 'jdoe' },
    inactive: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    userUndefined: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};

export const Default: Story = function Link(args) {
  const [visible, setVisible] = useState(false);
  return (
    <Space
      direction="vertical"
      align="center"
      style={{
        marginLeft: 100,
      }}
    >
      <Form.Item label="onVisibleChange was called">
        {visible ? 'Yes' : 'No'}
      </Form.Item>
      <UserAvatarWithDetailsPopover
        acronym={args.acronym}
        popover={{
          onVisibleChange: setVisible,
        }}
        user={
          args.userUndefined
            ? undefined
            : {
                acronym: args.acronym,
                email: args.email,
                firstname: args.firstname,
                lastname: args.lastname,
                username: args.username,
                inactive: args.inactive,
              }
        }
      />
    </Space>
  );
};

export const WithCustomChildren: Story = function Link(args) {
  const [visible, setVisible] = useState(false);
  const userProps = useMemo(
    () => ({
      acronym: args.acronym,
      email: args.email,
      firstname: args.firstname,
      lastname: args.lastname,
      username: args.username,
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
      <Form.Item label="onVisibleChange was called">
        {visible ? 'Yes' : 'No'}
      </Form.Item>
      <UserDetailsPopover
        popover={{
          onVisibleChange: setVisible,
        }}
        user={args.userUndefined ? undefined : userProps}
      >
        {args.username}
      </UserDetailsPopover>
    </Space>
  );
};
