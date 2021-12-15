import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from 'antd';
import React from 'react';

import { stringToHslaColor } from './utils';

export const Avatar: typeof AntdAvatar = AntdAvatar;
export type AvatarProps = AntdAvatarProps;

export type UserAvatarProps = AvatarProps & { username: string };

export function UserAvatar(props: UserAvatarProps) {
  const { username, ...rest } = props;

  return (
    <Avatar
      style={{
        backgroundColor: stringToHslaColor(username),
        color: 'white',
      }}
      {...rest}
    >
      {username}
    </Avatar>
  );
}
