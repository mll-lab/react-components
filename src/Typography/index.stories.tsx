import { Story } from '@storybook/react';
import React from 'react';

import { Typography, TypographyProps } from './index';

export default {
  title: 'Typography',
  component: Typography,
};

export const Link: Story<TypographyProps> = function Link(args) {
  return <Typography.Link {...args}>Test</Typography.Link>;
};

export const Paragraph: Story<TypographyProps> = function Paragraph(args) {
  return <Typography.Paragraph {...args}>Test</Typography.Paragraph>;
};

export const Text: Story<TypographyProps> = function Text(args) {
  return <Typography.Text {...args}>Test</Typography.Text>;
};

export const Title: Story<TypographyProps> = function Title(args) {
  return <Typography.Title {...args}>Test</Typography.Title>;
};
