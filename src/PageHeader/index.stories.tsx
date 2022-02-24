import { Story } from '@storybook/react';
import React from 'react';

import { PageHeader, PageHeaderProps } from './index';

export default {
  title: 'PageHeader',
};

export const Default: Story<PageHeaderProps> = (args) => (
  <PageHeader title="Title" subTitle="This is a subtitle" {...args} />
);
