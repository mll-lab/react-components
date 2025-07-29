import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd';
import { SwitchSize as AntdSwitchSize } from 'antd/es/switch';
import * as React from 'react';

export type SwitchSize = AntdSwitchSize;

export type SwitchProps = AntdSwitchProps;

export const Switch: React.ForwardRefExoticComponent<
  SwitchProps & React.RefAttributes<HTMLElement>
> = AntdSwitch;
