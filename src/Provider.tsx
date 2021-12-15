import { ConfigProvider as AntdConfigProvider } from 'antd';
import deDE from 'antd/lib/locale/de_DE';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { THEME, Theme } from './theme';

type ProviderProps = { theme?: Partial<Theme> };

export const PREFIX_CLS = 'mll-ant';

export function Provider({
  children,
  theme,
}: PropsWithChildren<ProviderProps>) {
  AntdConfigProvider.config({
    prefixCls: PREFIX_CLS,
  });

  return (
    <ThemeProvider theme={{ ...THEME, ...theme }}>
      <AntdConfigProvider locale={deDE} prefixCls={PREFIX_CLS}>
        {children}
      </AntdConfigProvider>
    </ThemeProvider>
  );
}
