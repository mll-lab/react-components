import { Story } from '@storybook/react';
import React from 'react';

import { PALETTE } from '../theme';

import { Tag, TagProps } from './index';

export default {
  title: 'Tag',
  component: Tag,
};

export const HexColored: Story<TagProps> = (args) => (
  <Tag color={PALETTE.gold} {...args}>
    Test
  </Tag>
);

export const PresetColored: Story<TagProps> = (args) => (
  <Tag color="red" {...args}>
    Test
  </Tag>
);

export const Checkable: Story<TagProps> = () => (
  <Tag.CheckableTag checked>Checkable Tag</Tag.CheckableTag>
);
