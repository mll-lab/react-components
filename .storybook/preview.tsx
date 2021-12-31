import * as React from 'react';
import { ComponentType } from 'react';

import { Provider } from '../src/Provider';

export const decorators = [
  (Story: ComponentType) => (
    <Provider>
      <Story />
    </Provider>
  ),
];
