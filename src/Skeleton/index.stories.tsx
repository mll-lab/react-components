import { Story } from '@storybook/react';
import React from 'react';

import { Skeleton } from './index';

export default {
  title: 'Skeleton',
  component: Skeleton,
};

export const Default: Story = (args) => <Skeleton {...args} />;
