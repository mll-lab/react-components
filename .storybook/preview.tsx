import * as React from 'react';
import { ComponentType } from 'react';
import { ThemeProvider } from 'styled-components';

import { MLL_THEME } from '../src/theme';

export const decorators = [
  (Story: ComponentType) => (
    <ThemeProvider theme={MLL_THEME}>
      <Story />
    </ThemeProvider>
  ),
];
