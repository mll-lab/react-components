import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import * as React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

import { MllTheme } from '../theme';

export interface ColoredButtonType
  extends React.ForwardRefExoticComponent<
    ColoredButtonProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof ButtonGroup;
  __ANT_BUTTON: boolean;
}

export interface ColoredButtonProps extends AntdButtonProps {
  color?: string;
}

function colorFromPropsOrTheme(
  props: ThemedStyledProps<ColoredButtonProps, MllTheme>,
) {
  return props.color || props.theme.borderColor;
}

export const FilledButton = styled(AntdButton as ColoredButtonType)`
  background: ${colorFromPropsOrTheme} !important;
  border-color: ${colorFromPropsOrTheme} !important;
  color: white !important;

  &:hover {
    background: transparent !important;
    color: ${colorFromPropsOrTheme} !important;
  }
`;

export const GhostButton = styled(AntdButton as ColoredButtonType)`
  background: transparent !important;
  border-color: ${colorFromPropsOrTheme} !important;
  color: ${colorFromPropsOrTheme} !important;

  &:hover {
    background: ${colorFromPropsOrTheme} !important;
    color: white !important;
  }
`;
