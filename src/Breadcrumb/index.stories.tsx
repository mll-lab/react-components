import { HomeOutlined } from '@ant-design/icons';
import { Story } from '@storybook/react';
import React from 'react';

import { Breadcrumb, BreadcrumbProps } from './index';

export default {
  title: 'Breadcrumb',
};

export const Default: Story<BreadcrumbProps> = (args) => (
  <Breadcrumb {...args}>
    <Breadcrumb.Item>
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>Application Center</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>Application List</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
);
