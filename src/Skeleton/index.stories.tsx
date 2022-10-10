import { Story } from '@storybook/react';
import React from 'react';

import { Skeleton, SkeletonProps } from './index';

export default {
  title: 'Skeleton',
  component: Skeleton,
};

export const Default: Story<SkeletonProps> = function Default(args) {
  return <Skeleton {...args} />;
};
