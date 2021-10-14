import { BellOutlined } from '@ant-design/icons';
import { Story } from '@storybook/react';
import React from 'react';

import { Badge, BadgeProps } from './index';

export default {
  title: 'Badge',
};

export const Default: Story<BadgeProps> = (args) => (
  <div>
    <Badge size="small" count={5} offset={[5, 0]} {...args}>
      <BellOutlined style={{ fontSize: '130%' }} />
    </Badge>
  </div>
);
