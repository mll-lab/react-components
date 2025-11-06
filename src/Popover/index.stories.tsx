import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Button } from '../Button';

import { Popover, PopoverProps } from './index';

export default {
  title: 'Popover',
  component: Popover,
};

export const Default: StoryFn<PopoverProps> = function Default() {
  return (
    <Popover title="Some title" content={<div>Some content</div>}>
      <Button>Hover me</Button>
    </Popover>
  );
};
