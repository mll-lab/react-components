/* eslint-disable @mll-lab/no-color-literals */

import {
  volcano,
  orange,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey,
} from '@ant-design/colors';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export const PALETTE = {
  red: '#ff0000', // matches the MLL corporate identity
  volcano: volcano[5],
  orange: orange[5],
  gold: gold[5],
  yellow: yellow[5],
  lime: lime[5],
  green: green[5],
  cyan: cyan[5],
  blue: blue[5],
  magenta: magenta[5],
  geekblue: geekblue[5],
  purple: purple[5],
  lightBlue: '#d4edfc',
  shakespeareBlue: '#50a0d0',

  white: '#ffffff', // brightest possible
  black: '#000000', // darkest possible

  grey: grey[5],
  grey1: '#fafafa',
  grey2: '#f0f2f5',
  grey3: '#eaeaea',
  grey4: '#dadada',
  grey5: '#d3d3d3',
  grey6: '#c0c0c0',
};

export const THEME = {
  borderColor: PALETTE.shakespeareBlue,
  dividerColor: PALETTE.grey4,
  tableBorderColor: PALETTE.grey3,
  containerBorderColor: PALETTE.grey5,
  backgroundColor: PALETTE.grey2,
  panelBackgroundColor: PALETTE.grey3,
  collapseBackgroundColor: PALETTE.lightBlue,
  focusedRowColor: PALETTE.lightBlue,
  titleColor: PALETTE.grey6,
  menuGroupBackgroundColor: PALETTE.grey1,
  successColor: PALETTE.green,
  warningColor: PALETTE.gold,
  errorColor: PALETTE.red,
  infoColor: PALETTE.grey4,
};

export type Theme = typeof THEME;

export function useTheme(): Theme {
  return useContext(ThemeContext) ?? THEME;
}

/** @deprecated use THEME */
export const MLL_THEME = THEME;

/** @deprecated use Theme */
export type MllTheme = Theme;

/** @deprecated use useTheme */
export const useMllTheme = useTheme;
