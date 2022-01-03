import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

/* eslint-disable @mll-lab/no-color-literals */
/**
 * Inspired by https://ant.design/docs/spec/colors
 */
export const PALETTE = {
  red: '#ff0000', // matches the MLL corporate identity
  gold: '#faad14',
  green: '#52c41a',
  blue: '#50a0d0',
  lightBlue: '#d4edfc',
  blueTintedGray: '#f0f2f5',

  // Shades
  white: '#ffffff', // brightest possible
  gray1: '#fafafa',
  gray2: '#f0f0f0',
  gray3: '#e6e6e6',
  gray4: '#d9d9d9',
  gray5: '#c0c0c0',
  gray6: '#8c8c8c',
  gray7: '#595959',
  gray8: '#434343',
  gray9: '#262626',
  black: '#000000', // darkest possible
};

/** @deprecated */
const DEPRECATED_PALETTE = {
  gray1: '#eaeaea',
  gray2: '#d3d3d3',
};
/* eslint-enable @mll-lab/no-color-literals */

export const THEME = {
  // Components
  backgroundColor: PALETTE.blueTintedGray,
  borderColor: PALETTE.blue,
  collapseBackgroundColor: PALETTE.lightBlue,
  containerBorderColor: DEPRECATED_PALETTE.gray2,
  dividerColor: PALETTE.gray4,
  focusedRowColor: PALETTE.lightBlue,
  menuGroupBackgroundColor: PALETTE.gray1,
  panelBackgroundColor: DEPRECATED_PALETTE.gray1,
  tableBorderColor: PALETTE.gray3,
  titleColor: PALETTE.gray5,
  disabledColors: {
    lowContrast: PALETTE.gray5,
  },

  // UI states
  successColor: PALETTE.green,
  warningColor: PALETTE.gold,
  errorColor: PALETTE.red,
  infoColor: PALETTE.gray7,
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
