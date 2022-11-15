import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import * as React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';
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
  color: ${PALETTE.white};
  font-size: ${fontSizeFromTheme};

  &:hover,
  &:focus {
    background: ${PALETTE.white};
    border-color: ${colorFromPropsOrTheme};
    color: ${colorFromPropsOrTheme};
  }

  &[disabled] {
    color: ${(props) => props.theme.disabledColors?.lowContrast};
  }
`;

export const GhostButton = styled(AntdButton as ColoredButtonType)`
  background: ${PALETTE.white};
  border-color: ${colorFromPropsOrTheme};
  color: ${colorFromPropsOrTheme};
  font-size: ${fontSizeFromTheme};

  &:hover,
  &:focus {
    background: ${colorFromPropsOrTheme};
    border-color: ${colorFromPropsOrTheme};
    color: ${PALETTE.white};
  }

  &[disabled] {
    color: ${(props) => props.theme.disabledColors?.lowContrast};
  }
`;
