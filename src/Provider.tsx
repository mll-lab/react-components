import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { MLL_THEME, MllTheme } from './theme';

type ProviderProps = { theme?: Partial<MllTheme> };

export function Provider({
  children,
  theme,
}: PropsWithChildren<ProviderProps>) {
  return (
    <ThemeProvider theme={{ ...MLL_THEME, ...theme }}>{children}</ThemeProvider>
  );
}
