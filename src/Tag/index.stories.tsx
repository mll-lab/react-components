import { Story } from '@storybook/react';
import React from 'react';

import { Tag, TagProps } from './index';
import {MLL_THEME} from "../theme";

export default {
  title: 'Tag',
  component: Tag,
};

export const HexColored: Story<TagProps> = (args) => (
  <Tag
      color={MLL_THEME.warningColor}
    {...args}
  >Test</Tag>
);

export const PresetColored: Story<TagProps> = (args) => (
    <Tag
        color={'red'}
        {...args}
    >Test</Tag>
);
