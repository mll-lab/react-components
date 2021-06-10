import { Story } from '@storybook/react';
import React from 'react';

import { MLL_THEME } from '../theme';

import { Avatar, AvatarProps, UserAvatar } from './index';

export default {
  title: 'Avatar',
};

export const Default: Story = (args) => (
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

export const ColoredUserAvatar: Story<AvatarProps> = (args) => (
  <UserAvatar toolTipLabel={'Test User'} initials={'TU'} {...args}/>
);

ColoredUserAvatar.argTypes = {
  initials: { control: { type: 'text' } },
  toolTipLabel: { control: { type: 'text' } },
};
