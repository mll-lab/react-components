import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd';
import * as React from 'react';

export type SwitchProps = AntdSwitchProps;

export const Switch: React.ForwardRefExoticComponent<
  SwitchProps & React.RefAttributes<HTMLElement>
> = AntdSwitch;
