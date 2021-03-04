import { ConfigProvider as AntdConfigProvider } from 'antd';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { MLL_THEME, MllTheme } from './theme';

type ProviderProps = { theme?: MllTheme };

const PREFIX_CLS = 'mll-ant';

export function Provider({
  children,
  theme,
}: PropsWithChildren<ProviderProps>) {
  AntdConfigProvider.config({
    prefixCls: PREFIX_CLS,
  });

  return (
    <ThemeProvider theme={theme ?? MLL_THEME}>
      <AntdConfigProvider prefixCls={PREFIX_CLS}>
        <div id={PREFIX_CLS}>{children}</div>
      </AntdConfigProvider>
    </ThemeProvider>
  );
}
