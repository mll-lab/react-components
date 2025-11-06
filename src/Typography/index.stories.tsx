import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Typography, TypographyProps } from './index';

export default {
  title: 'Typography',
  component: Typography,
};

export const Link: StoryFn<TypographyProps> = function Link(args) {
  return <Typography.Link {...args}>Test</Typography.Link>;
};

export const Paragraph: StoryFn<TypographyProps> = function Paragraph(args) {
  return <Typography.Paragraph {...args}>Test</Typography.Paragraph>;
};

export const Text: StoryFn<TypographyProps> = function Text(args) {
  return <Typography.Text {...args}>Test</Typography.Text>;
};

export const Title: StoryFn<TypographyProps> = function Title(args) {
  return <Typography.Title {...args}>Test</Typography.Title>;
};
