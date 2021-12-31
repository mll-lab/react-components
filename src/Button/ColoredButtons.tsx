import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import * as React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

import { PALETTE, Theme } from '../theme';

export type ColoredButtonType = {
  Group: typeof ButtonGroup;
  __ANT_BUTTON: boolean;
} & React.ForwardRefExoticComponent<
  ColoredButtonProps & React.RefAttributes<HTMLElement>
>;

export type ColoredButtonProps = {
  color?: string;
} & AntdButtonProps;

function colorFromPropsOrTheme(
  props: ThemedStyledProps<ColoredButtonProps, Theme>,
) {
  return props.color || props.theme.borderColor;
}

export const FilledButton = styled(AntdButton as ColoredButtonType)`
  background: ${colorFromPropsOrTheme};
  border-color: ${colorFromPropsOrTheme};
  color: white;
  font-size: ${(props) => props.theme.fontSize};

  &:hover,
  &:focus {
    background: transparent;
    border-color: ${colorFromPropsOrTheme};
    color: ${colorFromPropsOrTheme};
  }
`;

export const GhostButton = styled(AntdButton as ColoredButtonType)`
  background: transparent;
  border-color: ${colorFromPropsOrTheme};
  color: ${colorFromPropsOrTheme};
  font-size: ${(props) => props.theme.fontSize};

  &:hover,
  &:focus {
    background: ${colorFromPropsOrTheme};
    border-color: ${colorFromPropsOrTheme};
    color: ${PALETTE.white};
  }
`;
