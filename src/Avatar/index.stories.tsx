import { Story } from '@storybook/react';
import { range } from 'lodash';
import React from 'react';

import { MLL_THEME } from '../theme';

import { randomString } from './utils';

import { Avatar, AvatarProps, UserAvatar, UserAvatarProps } from './index';

export default {
  title: 'Avatar',
};

export const Default: Story<AvatarProps> = (args) => (
  <Avatar
    style={{
      backgroundColor: MLL_THEME.warningColor,
      color: MLL_THEME.backgroundColor,
    }}
    {...args}
  >
    Test
  </Avatar>
);

export const CustomizableUserAvatar: Story<UserAvatarProps> = (args) => (
  <UserAvatar {...args} />
);

CustomizableUserAvatar.argTypes = {
  username: { control: { type: 'text' }, defaultValue: 'ABC' },
};

export const VariableUserAvatars: Story<Omit<UserAvatarProps, 'username'>> = (
  args,
) => (
  <>
    {range(1, 50).map((i) => (
      <UserAvatar key={i} username={randomString()} {...args} />
    ))}
  </>
);
