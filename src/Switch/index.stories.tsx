import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Switch, SwitchProps } from './index';

export default {
  title: 'Switch',
  component: Switch,
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Default: StoryFn<SwitchProps> = function Default(args) {
  return <Switch {...args} />;
};
