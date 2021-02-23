import { addDecorator } from '@storybook/react';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import '@storybook/addon-console';

import { MLL_THEME } from '../src/theme';

addDecorator((story) => (
  <ThemeProvider theme={MLL_THEME}>
    <div style={{ margin: '50px' }}>{story()}</div>
  </ThemeProvider>
));
