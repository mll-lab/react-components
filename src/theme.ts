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
  warningColor: '#faad14',
};

export type MllTheme = typeof MLL_THEME;
