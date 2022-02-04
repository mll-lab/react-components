import { Story } from '@storybook/react';
import React from 'react';

import { Provider } from '../Provider';
import { THEME } from '../theme';
import { Typography, TypographyProps } from './index';

export default {
  title: 'Typography',
  component: Typography,
};

export const Link: Story<TypographyProps> = (args) => (
  <Typography.Link {...args}>Test</Typography.Link>
);

export const Paragraph: Story<TypographyProps> = (args) => (
  <Typography.Paragraph {...args}>Test</Typography.Paragraph>
);

export const Text: Story<TypographyProps> = (args) => (
  <Typography.Text {...args}>Test</Typography.Text>
);

export const Title: Story<TypographyProps> = (args) => (
  <Provider theme={THEME}>
    <Typography.Title {...args} level={1}>
      Title Level 1
    </Typography.Title>
    <Typography.Title {...args} level={2}>
      Title Level 2
    </Typography.Title>
    <Typography.Title {...args} level={3}>
      Title Level 3
    </Typography.Title>
    <Typography.Title {...args} level={4}>
      Title Level 4
    </Typography.Title>
    <Typography.Title {...args} level={5}>
      Title Level 5
    </Typography.Title>
  </Provider>
);
