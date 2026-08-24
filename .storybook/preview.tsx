import * as React from 'react';
import { ComponentType } from 'react';

// Consumers get these via src/index.ts, Storybook imports src/Provider directly.
// eslint-disable-next-line @mll-lab/no-global-styles
import '../src/antd.less';
import { Provider } from '../src/Provider';

export const decorators = [
  (Story: ComponentType) => (
    <Provider>
      <Story />
    </Provider>
  ),
];
