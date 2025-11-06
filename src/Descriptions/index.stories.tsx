import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Descriptions, DescriptionsProps } from './index';

export default {
  title: 'Descriptions',
  component: Descriptions,
};

export const Default: StoryFn<DescriptionsProps> = function Default(args) {
  return (
    <Descriptions title="User Info" bordered {...args}>
      <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
      <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
      <Descriptions.Item label="Order time">
        2018-04-24 18:00:00
      </Descriptions.Item>
      <Descriptions.Item label="Usage Time" span={2}>
        2019-04-24 18:00:00
      </Descriptions.Item>
    </Descriptions>
  );
};
