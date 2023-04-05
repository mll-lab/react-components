import { Story } from '@storybook/react';
import React from 'react';

import { UserAvatar } from '../Avatar';

import { UserPopover } from './index';

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
    open: {
      control: {
        type: 'boolean',
      },
      defaultValue: undefined,
    },
  },
};

export const Basic: Story = function Link(args) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <UserPopover
        loading={args.loading}
        open={args.open}
        user={{
          acronym: args.acronym,
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          userName: args.userName,
          inactive: args.inactive,
        }}
      >
        <UserAvatar username={args.acronym} />
      </UserPopover>
    </div>
  );
};
