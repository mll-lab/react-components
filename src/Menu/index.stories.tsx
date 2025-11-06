import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Menu, MenuProps } from './index';

export default {
  title: 'Menu',
};

export const Default: StoryFn<MenuProps> = function Default(args) {
  return (
    <Menu {...args}>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  );
};
