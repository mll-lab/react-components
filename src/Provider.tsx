import { ConfigProvider as AntdConfigProvider } from 'antd';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { MLL_THEME, MllTheme } from './theme';

type ProviderProps = { theme?: Partial<MllTheme> };

export const PREFIX_CLS = 'mll-ant';

export function Provider({
  children,
  theme,
}: PropsWithChildren<ProviderProps>) {
  AntdConfigProvider.config({
    prefixCls: PREFIX_CLS,
  });

  return (
    <ThemeProvider theme={{ ...MLL_THEME, ...theme }}>
      <AntdConfigProvider
        prefixCls={PREFIX_CLS}
      >
        {children}
      </AntdConfigProvider>
    </ThemeProvider>
  );
}
