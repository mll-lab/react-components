import { StoryFn } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { Button } from '../Button';

import { Drawer, DrawerProps } from './index';

export default {
  title: 'Drawer',
};

export const Default: StoryFn<DrawerProps> = function Default(args) {
  const [visible, setVisible] = useState(true);

  const toggleDrawer = () => setVisible((prevState) => !prevState);

  return (
    <div>
      <Button onClick={toggleDrawer}>Open</Button>
      <Drawer title="Title" onClose={toggleDrawer} visible={visible} {...args}>
        Content
      </Drawer>
    </div>
  );
};
