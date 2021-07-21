import * as React from 'react';
import { ComponentType } from 'react';

import { Provider } from '../src';

export const decorators = [
  (Story: ComponentType) => (
    <Provider>
      <Story />
    </Provider>
  ),
];
