import { Story } from '@storybook/react';
import React from 'react';

import { Typography, TypographyProps } from './index';

export default {
  title: 'Typography',
  component: Typography,
};

export const Link: Story<TypographyProps> = (args) => (
  <Typography.Link {...args}>
    Test
  </Typography.Link>
);

export const Paragraph: Story<TypographyProps> = (args) => (
  <Typography.Paragraph {...args}>
    Test
  </Typography.Paragraph>
);

export const Text: Story<TypographyProps> = (args) => (
  <Typography.Text {...args}>
    Test
  </Typography.Text>
);

export const Title: Story<TypographyProps> = (args) => (
  <Typography.Title {...args}>
    Test
  </Typography.Title>
);
