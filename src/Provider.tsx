import { ConfigProvider as AntdConfigProvider } from 'antd';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { MLL_THEME, MllTheme } from './theme';

type ProviderProps = { theme?: MllTheme };

export function Provider({
  children,
  theme,
}: PropsWithChildren<ProviderProps>) {
  return (
    <ThemeProvider theme={theme ?? MLL_THEME}>
      <AntdConfigProvider prefixCls={'mll-ant'}>{children}</AntdConfigProvider>
    </ThemeProvider>
  );
}
