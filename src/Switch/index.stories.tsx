import { Story } from '@storybook/react';
import React from 'react';

import { Switch, SwitchProps } from './index';

export default {
  title: 'Switch',
  component: Switch,
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Default: Story<SwitchProps> = (args) => <Switch {...args} />;
