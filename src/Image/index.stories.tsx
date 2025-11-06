import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Image, ImageProps } from './index';

export default {
  title: 'Image',
  component: Image,
  args: {
    width: 200,
  },
};

export const Default: StoryFn<ImageProps> = function Default(args) {
  return (
    <Image
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      {...args}
    />
  );
};
