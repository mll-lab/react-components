import * as React from 'react';

import { Provider } from '../src';

export const decorators = [
  (Story) => (
    <Provider>
      <Story />
    </Provider>
  ),
];
