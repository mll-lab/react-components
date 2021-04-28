import { Story } from '@storybook/react';
import React from 'react';

import { Menu } from '../Menu';

import { Dropdown, DropdownProps } from './index';

export default {
  title: 'Dropdown',
};

export const Default: Story<DropdownProps> = (args) => (
  <Dropdown
    // @ts-ignore-next-line: ignore warning about 'overlay' will be overwritten by ...args because it is a required prop
    overlay={
      <Menu style={{ width: 150 }} mode="vertical">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
      </Menu>
    }
    {...args}
  >
    <p>Text</p>
  </Dropdown>
);
