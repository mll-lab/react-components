import { ConfigProvider as AntdConfigProvider } from 'antd';
import deDE from 'antd/es/locale/de_DE';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { ModalConfirmStyles } from '../Modal';
import { THEME, Theme } from '../theme';

export const PREFIX_CLS = 'mll-ant';

export function Provider({
  children,
  theme,
}: PropsWithChildren<{ theme?: Partial<Theme> }>) {
  AntdConfigProvider.config({
    prefixCls: PREFIX_CLS,
  });

  return (
    <ThemeProvider theme={{ ...THEME, ...theme }}>
      <AntdConfigProvider
        locale={deDE}
        prefixCls={PREFIX_CLS}
        componentSize={theme?.size}
      >
        <ModalConfirmStyles />
        {children}
      </AntdConfigProvider>
    </ThemeProvider>
  );
}

/** Prefixes content that antd renders outside of <Provider>, without changing the global locale. */
export function PrefixProvider({ children }: PropsWithChildren) {
  return (
    <AntdConfigProvider prefixCls={PREFIX_CLS}>{children}</AntdConfigProvider>
  );
}
