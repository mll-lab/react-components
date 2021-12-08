import { gold, green, grey } from '@ant-design/colors';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

/* eslint-disable @mll-lab/no-color-literals */
export const PALETTE = {
  red: '#ff0000', // matches the MLL corporate identity
  gold: gold[5],
  green: green[5],
  lightBlue: '#d4edfc',
  blue: '#50a0d0',

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
/* eslint-enable @mll-lab/no-color-literals */

export const THEME = {
  // Components
  backgroundColor: PALETTE.grey2,
  borderColor: PALETTE.blue,
  collapseBackgroundColor: PALETTE.lightBlue,
  containerBorderColor: PALETTE.grey5,
  dividerColor: PALETTE.grey4,
  focusedRowColor: PALETTE.lightBlue,
  menuGroupBackgroundColor: PALETTE.grey1,
  panelBackgroundColor: PALETTE.grey3,
  tableBorderColor: PALETTE.grey3,
  titleColor: PALETTE.grey6,

  // UI states
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
