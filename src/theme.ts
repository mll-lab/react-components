import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

/* eslint-disable @mll-lab/no-color-literals */
/**
 * Inspired by https://ant.design/docs/spec/colors
 */
export const PALETTE = {
  red: '#ff0000', // matches the MLL corporate identity
  gold: '#ffc53d',
  green: '#bae637',
  blue: '#50a0d0',
  lightBlue: '#d4edfc',

  // Shades
  white: '#ffffff', // brightest possible
  lightGray: '#f0f0f0',
  gray: '#8c8c8c',
  darkGray: '#262626',
  black: '#000000', // darkest possible

  // TODO reduce to a minimal set of sufficiently different shades
  /** @deprecated */
  gray1: '#fafafa',
  /** @deprecated */
  gray2: '#f0f2f5',
  /** @deprecated */
  gray3: '#eaeaea',
  /** @deprecated */
  gray4: '#dadada',
  /** @deprecated */
  gray5: '#d3d3d3',
  /** @deprecated */
  gray6: '#c0c0c0',
};
/* eslint-enable @mll-lab/no-color-literals */

export const THEME = {
  // Components
  backgroundColor: PALETTE.gray2,
  borderColor: PALETTE.blue,
  collapseBackgroundColor: PALETTE.lightBlue,
  containerBorderColor: PALETTE.gray5,
  dividerColor: PALETTE.gray4,
  focusedRowColor: PALETTE.lightBlue,
  menuGroupBackgroundColor: PALETTE.gray1,
  panelBackgroundColor: PALETTE.gray3,
  tableBorderColor: PALETTE.gray3,
  titleColor: PALETTE.gray6,

  // UI states
  successColor: PALETTE.green,
  warningColor: PALETTE.gold,
  errorColor: PALETTE.red,
  infoColor: PALETTE.gray4,
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
