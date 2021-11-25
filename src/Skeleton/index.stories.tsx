import { Story } from '@storybook/react';
import React from 'react';

import { Skeleton } from './index';

export default {
  title: 'Skeleton',
  component: Skeleton,
};

export const Default: Story = (args) => <Skeleton {...args} />;
export const Button: Story = (args) => <Skeleton.Button {...args} />;
export const Input: Story = (args) => <Skeleton.Input {...args} />;
export const Avatar: Story = (args) => <Skeleton.Avatar {...args} />;
export const Image: Story = (args) => <Skeleton.Image {...args} />;
