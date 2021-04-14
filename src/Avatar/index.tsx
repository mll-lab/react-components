import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from 'antd';
import React from 'react';

import { MLL_THEME } from '../theme';

import { stringToHslaColor } from './utils';

export const Avatar: typeof AntdAvatar = AntdAvatar;
export type AvatarProps = AntdAvatarProps;

export function UserAvatar(props: AvatarProps & { username: string }) {
  const color = stringToHslaColor(props.username);
  return (
    <Avatar
      style={{ backgroundColor: color, color: MLL_THEME.backgroundColor }}
    >
      {props.username}
    </Avatar>
  );
}
