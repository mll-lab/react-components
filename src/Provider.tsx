import { ConfigProvider as AntdConfigProvider } from 'antd';
import React, { PropsWithChildren, useRef } from 'react';
import { ThemeProvider } from 'styled-components';

import { MLL_THEME, MllTheme } from './theme';

type ProviderProps = { theme?: Partial<MllTheme> };

export const PREFIX_CLS = 'mll-ant';

export function Provider({
  children,
  theme,
}: PropsWithChildren<ProviderProps>) {
  const styleScopeDiv = useRef(null);

  AntdConfigProvider.config({
    prefixCls: PREFIX_CLS,
  });

  return (
    <ThemeProvider theme={{ ...MLL_THEME, ...theme }}>
      <AntdConfigProvider
        prefixCls={PREFIX_CLS}
        // Necessary so that styles apply to components such as Tooltip
        getPopupContainer={() => styleScopeDiv.current ?? document.body}
      >
        <div className={PREFIX_CLS} ref={styleScopeDiv}>
          {children}
        </div>
      </AntdConfigProvider>
    </ThemeProvider>
  );
}
