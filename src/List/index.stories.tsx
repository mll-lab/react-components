import { StoryFn } from '@storybook/react-webpack5';
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

export const Strings: StoryFn<ListProps<string>> = function Strings(args) {
  return (
    <List
      dataSource={['foo', 'bar', 'baz']}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      {...args}
    />
  );
};
