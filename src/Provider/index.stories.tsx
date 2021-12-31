import { Story } from '@storybook/react';
import { Space, Typography } from 'antd';
import React from 'react';

import { CreateButton } from '../Button';
import { Provider } from '../Provider';
import { Table } from '../Table';
import { Theme } from '../theme';

export default {
  title: 'ThemeProvider',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'middle', 'large', undefined],
        defaultValue: 'small',
      },
    },
    fontSize: {
      control: { type: 'text' },
      defaultValue: '11px',
    },
  },
};

export const Default: Story<Theme> = (args) => (
  <Provider
    theme={{
      size: args.size,
      fontSize: args.fontSize,
    }}
  >
    <Components />
  </Provider>
);

export const NestedOverwrite: Story = (args) => (
  <Provider
    theme={{
      size: 'large',
      fontSize: '30px',
    }}
  >
    <Typography.Paragraph>
      When multiple ThemeProviders are nested, components get values from the
      closest ThemeProvider.
    </Typography.Paragraph>
    <Provider
      theme={{
        size: args.size,
        fontSize: args.fontSize,
      }}
    >
      <Components />
    </Provider>
  </Provider>
);

export const PropsHavePriority: Story = (args) => (
  <Provider
    theme={{
      size: args.size,
      fontSize: args.fontSize,
    }}
  >
    <Space direction="vertical" size="middle">
      <Typography.Paragraph>
        Props get passed directly to the components and have priority.
      </Typography.Paragraph>
      <CreateButton size="large" style={{ fontSize: '16px' }} />
      <Table
        size="large"
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
  </Provider>
);

function Components() {
  return (
    <Space direction="vertical">
      <CreateButton />
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
  );
}
