import { StoryFn } from '@storybook/react';
import { range } from 'lodash';
import React from 'react';

import { PALETTE } from '../theme';

import { randomString } from './utils';

import { Avatar, AvatarProps, UserAvatar, UserAvatarProps } from './index';

export default {
  title: 'Avatar',
  args: {
    username: 'ABC',
  },
};

export const Default: StoryFn<AvatarProps> = function Default(args) {
  return (
    <Avatar
      style={{
        backgroundColor: PALETTE.gold,
        color: PALETTE.white,
      }}
      {...args}
    >
      Test
    </Avatar>
  );
};

export const CustomizableUserAvatar: StoryFn<UserAvatarProps> =
  function CustomizableUserAvatar(args) {
    return <UserAvatar {...args} />;
  };

export const VariableUserAvatars: StoryFn<Omit<UserAvatarProps, 'username'>> =
  function VariableUserAvatars(args) {
    return (
      <>
        {range(1, 50).map((i) => (
          <UserAvatar key={i} {...args} username={randomString()} />
        ))}
      </>
    );
  };
