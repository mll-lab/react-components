import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import * as React from 'react';
import styled from 'styled-components';

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
  props: ColoredButtonProps & { theme: Theme },
): string {
  return props.color || props.theme.borderColor;
}

export const FilledButton = styled(AntdButton as ColoredButtonType)`
  font-size: ${fontSizeFromTheme};

  background: ${colorFromPropsOrTheme};
  border-color: ${colorFromPropsOrTheme};
  color: ${PALETTE.white};

  &:hover:not([disabled]),
  &:focus:not([disabled]) {
    background: ${colorFromPropsOrTheme};
    border-color: ${colorFromPropsOrTheme};
    color: ${PALETTE.white};
    filter: brightness(90%);
  }

  &[disabled],
  &:hover[disabled],
  &:focus[disabled] {
    color: ${(props) => props.theme.disabledColors?.lowContrast};
  }
`;

export const GhostButton = styled(AntdButton as ColoredButtonType)`
  font-size: ${fontSizeFromTheme};

  background: ${PALETTE.white};
  border-color: ${colorFromPropsOrTheme};
  color: ${colorFromPropsOrTheme};

  &:hover:not([disabled]),
  &:focus:not([disabled]) {
    background: ${PALETTE.white};
    border-color: ${colorFromPropsOrTheme};
    color: ${colorFromPropsOrTheme};
    filter: brightness(90%);
  }

  &[disabled],
  &:hover[disabled],
  &:focus[disabled] {
    color: ${(props) => props.theme.disabledColors?.lowContrast};
  }
`;
