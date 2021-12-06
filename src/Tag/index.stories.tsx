import { Story } from '@storybook/react';
import React from 'react';

import { THEME } from '../theme';

import { Tag, TagProps } from './index';

export default {
  title: 'Tag',
  component: Tag,
};

export const HexColored: Story<TagProps> = (args) => (
  <Tag color={THEME.warningColor} {...args}>
    Test
  </Tag>
);

export const PresetColored: Story<TagProps> = (args) => (
  <Tag color="red" {...args}>
    Test
  </Tag>
);
