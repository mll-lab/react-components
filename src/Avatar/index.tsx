import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from 'antd';
import React from 'react';

import { Tooltip } from '../Tooltip';
import { MLL_THEME } from '../theme';

import { stringToHslaColor } from './utils';

export const Avatar: typeof AntdAvatar = AntdAvatar;
export type AvatarProps = AntdAvatarProps;

type AvatarUserProps = { toolTipLabel?: string; initials: string };

export function UserAvatar(props: AvatarProps & AvatarUserProps) {
  const color = stringToHslaColor(props.initials);
  return (
    <Tooltip title={props.toolTipLabel ?? null}>
      <Avatar
        style={{ backgroundColor: color, color: MLL_THEME.backgroundColor }}
      >
        {props.initials}
      </Avatar>
    </Tooltip>
  );
}
