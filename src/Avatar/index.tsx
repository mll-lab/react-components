import { UserOutlined } from '@ant-design/icons';
import { stringToHslaColor } from '@mll-lab/js-utils';
import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from 'antd';
import React from 'react';

export const Avatar: typeof AntdAvatar = AntdAvatar;
export type AvatarProps = AntdAvatarProps;

export type UserAvatarProps = AvatarProps & {
  username: string | undefined | null;
};

export function UserAvatar(props: UserAvatarProps) {
  const { username, ...rest } = props;

  if (!username) {
    return <Avatar icon={<UserOutlined />} {...rest} />;
  }

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
