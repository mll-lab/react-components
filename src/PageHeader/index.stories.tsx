import { StoryFn } from '@storybook/react';
import React from 'react';

import { PageHeader, PageHeaderProps } from './index';

export default {
  title: 'PageHeader',
};

export const Default: StoryFn<PageHeaderProps> = function Default(args) {
  return <PageHeader title="Title" subTitle="This is a subtitle" {...args} />;
};
