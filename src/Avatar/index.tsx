import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from 'antd';
import React from 'react';

import { MLL_THEME } from '../theme';

import { stringToHslaColor } from './utils';

export const Avatar: typeof AntdAvatar = AntdAvatar;
export type AvatarProps = AntdAvatarProps;

export type UserAvatarProps = AvatarProps & { username: string };

export function UserAvatar(props: UserAvatarProps) {
  const { username, ...rest } = props;
  const color = stringToHslaColor(username);

  return (
    <Avatar
      style={{ backgroundColor: color, color: MLL_THEME.backgroundColor }}
      {...rest}
    >
      {username}
    </Avatar>
  );
}
