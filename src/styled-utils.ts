import { ThemeProps } from 'styled-components';

import { Theme } from './theme';

export function fontSizeFromTheme({ theme }: ThemeProps<Theme>) {
  return theme.fontSize;
}
