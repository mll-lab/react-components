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
  green: '#07a31e',
  blue: '#50a0d0',
  lightBlue: '#d4edfc',
  blueTintedGray: '#f0f2f5',
  tableHeaderBackgroundColor: '#2f7eae',
  tableRowStripeBackgroundColor: 'rgb(228,238,250,0.45)',

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
/* eslint-enable @mll-lab/no-color-literals */

export type Theme = {
  anchorColor: string;
  backgroundColor: string;
  borderColor: string;
  collapseBackgroundColor: string;
  collapseTransition?: string;
  containerBorderColor: string;
  dividerColor: string;
  focusedRowColor: string;
  menuGroupBackgroundColor: string;
  panelBackgroundColor: string;
  tableBorderColor: string;
  titleColor: string;
  disabledColors?: {
    lowContrast: string;
  };

  dangerColor: string;
  errorColor: string;
  infoColor: string;
  successColor: string;
  warningColor: string;

  tableHeaderBackgroundColor: string;
  tableRowStripeBackgroundColor: string;

  fontSize?: string;
  size?: SizeType;
};

export const THEME: Theme = {
  // Components
  anchorColor: PALETTE.blue,
  backgroundColor: PALETTE.blueTintedGray,
  borderColor: PALETTE.blue,
  collapseBackgroundColor: PALETTE.lightBlue,
  collapseTransition: '0.05s',
  containerBorderColor: PALETTE.gray4,
  dividerColor: PALETTE.gray4,
  focusedRowColor: PALETTE.lightBlue,
  menuGroupBackgroundColor: PALETTE.gray1,
  panelBackgroundColor: PALETTE.gray3,
  tableBorderColor: PALETTE.gray4,
  tableHeaderBackgroundColor: PALETTE.tableHeaderBackgroundColor,
  tableRowStripeBackgroundColor: PALETTE.tableRowStripeBackgroundColor,
  titleColor: PALETTE.gray5,
  disabledColors: {
    lowContrast: PALETTE.gray5,
  },

  // UI states
  dangerColor: PALETTE.red,
  errorColor: PALETTE.red,
  infoColor: PALETTE.gray7,
  successColor: PALETTE.green,
  warningColor: PALETTE.gold,

  // Sizes
  fontSize: '12px', // antd default for compact theme (compact.less)
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
