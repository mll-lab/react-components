import { Story } from '@storybook/react';
import { Space } from 'antd';
import React from 'react';

import { Button } from '../Button';
import { Table } from '../Table';

import { LayoutProvider } from './index';

export default {
  title: 'LayoutProvider',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
        defaultValue: 'medium',
      },
    },
    fontSize: {
      control: { type: 'text' },
      defaultValue: '12px',
    },
  },
};

export const Default: Story<Parameters<typeof LayoutProvider>[0]['value']> = (
  args,
) => (
  <LayoutProvider
    value={{
      size: args.size,
      fontSize: args.fontSize,
    }}
  >
    <Space direction="vertical" size="middle">
      <Button>Button</Button>
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
          },
        ]}
        dataSource={[
          {
            id: 1,
            name: 'John Brown',
            age: 32,
          },
          {
            id: 2,
            name: 'Jim Green',
            age: 42,
          },
        ]}
      />
    </Space>
  </LayoutProvider>
);
