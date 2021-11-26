import { Story } from '@storybook/react';
import React from 'react';

import { Image, ImageProps } from './index';

export default {
  title: 'Image',
  component: Image,
  argTypes: { width: { control: { type: 'number' }, defaultValue: 200 } },
};

export const Default: Story<ImageProps> = (args) => (
  <Image
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    {...args}
  />
);
