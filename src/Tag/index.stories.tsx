import { StoryFn } from '@storybook/react';
import React from 'react';

import { PALETTE } from '../theme';

import { Tag, TagProps } from './index';

export default {
  title: 'Tag',
  component: Tag,
};

export const HexColored: StoryFn<TagProps> = function HexColored(args) {
  return (
    <Tag color={PALETTE.gold} {...args}>
      Test
    </Tag>
  );
};

export const PresetColored: StoryFn<TagProps> = function PresetColored(args) {
  return (
    <Tag color="red" {...args}>
      Test
    </Tag>
  );
};

export const Checkable: StoryFn<TagProps> = function Checkable() {
  return <Tag.CheckableTag checked>Checkable Tag</Tag.CheckableTag>;
};
