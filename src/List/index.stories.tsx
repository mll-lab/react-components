import { Story } from '@storybook/react';
import React from 'react';

import { List, ListProps } from './index';

export default {
  title: 'List',
  component: List,
  argTypes: {
    bordered: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export const Strings: Story<ListProps<string>> = (args) => (
  <List
    {...args}
    dataSource={['foo', 'bar', 'baz']}
    renderItem={(item) => <List.Item>{item}</List.Item>}
  />
);
