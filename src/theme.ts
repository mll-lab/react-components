/* eslint-disable @mll-lab/no-color-literals */

/**
 * We omit special purpose colors:
 * - 'white': Brightest possible
 * - 'black': Darkest possible
 * - 'transparent': No color
 */
export const MLL_THEME = {
  borderColor: '#50a0d0',
  dividerColor: '#dadada',
  tableBorderColor: '#e8e8e8',
  containerBorderColor: '#d3d3d3',
  backgroundColor: '#f0f2f5',
  panelBackgroundColor: '#eaeaea',
  collapseBackgroundColor: '#d4edfc',
  focusedRowColor: '#d4edfc',
  titleColor: '#c0c0c0',
  menuGroupBackgroundColor: '#fafafa',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#f5222d',
  infoColor: '#d9d9d9',
};

export type MllTheme = typeof MLL_THEME;
