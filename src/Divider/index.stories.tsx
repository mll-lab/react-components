import { Story } from '@storybook/react';
import React from 'react';

import { Divider, DividerProps } from './index';

export default {
  title: 'Divider',
};

export const Default: Story<DividerProps> = (args) => (
  <Divider orientation="left" {...args}>
    Left Text
  </Divider>
);
