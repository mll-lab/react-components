import { StoryFn } from '@storybook/react';
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
