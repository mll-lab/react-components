import { Story } from '@storybook/react';
import React from 'react';

import { Breadcrumb, BreadcrumbProps } from './index';
import {HomeOutlined} from "@ant-design/icons";

export default {
  title: 'Breadcrumb',
};

export const Default: Story<BreadcrumbProps> = (args) => (
  <Breadcrumb {...args}>
    <Breadcrumb.Item><HomeOutlined /></Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Application Center</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Application List</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
);
