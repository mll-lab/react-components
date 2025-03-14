import { Story } from '@storybook/react';
import React from 'react';

import { List, ListProps } from './index';

export default {
  title: 'List',
  component: List,
  args: {
    bordered: false,
    loading: false,
  },
};

export const Strings: Story<ListProps<string>> = function Strings(args) {
  return (
    <List
      dataSource={['foo', 'bar', 'baz']}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      {...args}
    />
  );
};
