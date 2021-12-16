import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import * as React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

import { Theme } from '../theme';

export type ColoredButtonType = {
  Group: typeof ButtonGroup;
  __ANT_BUTTON: boolean;
} & React.ForwardRefExoticComponent<
  ColoredButtonProps & React.RefAttributes<HTMLElement>
>;

export type ColoredButtonProps = {
  color?: string;
  fontSize?: string;
} & AntdButtonProps;

function colorFromPropsOrTheme(
  props: ThemedStyledProps<ColoredButtonProps, Theme>,
) {
  return props.color || props.theme.borderColor;
}

function fontSizeFromProps(
  props: ThemedStyledProps<ColoredButtonProps, Theme>,
) {
  return props.fontSize;
}

export const FilledButton = styled(AntdButton as ColoredButtonType)`
  background: ${colorFromPropsOrTheme} !important;
  border-color: ${colorFromPropsOrTheme} !important;
  color: white !important;
  font-size: ${fontSizeFromProps};

  &:hover,
  &:focus {
    background: transparent !important;
    color: ${colorFromPropsOrTheme} !important;
  }
`;

export const GhostButton = styled(AntdButton as ColoredButtonType)`
  background: transparent !important;
  border-color: ${colorFromPropsOrTheme} !important;
  color: ${colorFromPropsOrTheme} !important;
  font-size: ${fontSizeFromProps};

  &:hover,
  &:focus {
    background: ${colorFromPropsOrTheme} !important;
    color: white !important;
  }
`;
