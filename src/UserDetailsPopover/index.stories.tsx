import { StoryFn } from '@storybook/react-webpack5';
import React, { useMemo, useState } from 'react';

import { Form } from '../Form';
import { Space } from '../Space';

import { UserAvatarWithDetailsPopover, UserDetailsPopover } from './index';

export default {
  title: 'UserPopover',
  args: {
    acronym: 'JD',
    email: 'john.doe@mll.com',
    firstname: 'John',
    lastname: 'Doe',
    phone: '123',
    username: 'jdoe',
    inactive: false,
    userUndefined: false,
  },
};

export const Default: StoryFn = function Link(args) {
  const [visible, setVisible] = useState(false);
  return (
    <Space
      vertical
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
                phone: args.phone,
                inactive: args.inactive,
              }
        }
      />
    </Space>
  );
};

export const WithCustomChildren: StoryFn = function Link(args) {
  const [visible, setVisible] = useState(false);
  const userProps = useMemo(
    () => ({
      acronym: args.acronym,
      email: args.email,
      firstname: args.firstname,
      lastname: args.lastname,
      username: args.username,
      phone: args.phone,
      inactive: args.inactive,
    }),
    [args],
  );

  return (
    <Space
      vertical
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
