import { SizeType } from 'antd/es/config-provider/SizeContext';
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

export type Theme = {
  backgroundColor: string;
  borderColor: string;
  collapseBackgroundColor: string;
  containerBorderColor: string;
  dividerColor: string;
  focusedRowColor: string;
  menuGroupBackgroundColor: string;
  panelBackgroundColor: string;
  tableBorderColor: string;
  titleColor: string;

  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;

  fontSize?: string;
  size?: SizeType;
};

export const THEME: Theme = {
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

  // UI states
  successColor: PALETTE.green,
  warningColor: PALETTE.gold,
  errorColor: PALETTE.red,
  infoColor: PALETTE.gray4,

  // Sizes
  fontSize: '14px', // antd default
};

export function useTheme(): Theme {
  return useContext(ThemeContext) ?? THEME;
}

/** @deprecated use THEME */
export const MLL_THEME = THEME;

/** @deprecated use Theme */
export type MllTheme = Theme;

/** @deprecated use useTheme */
export const useMllTheme = useTheme;
