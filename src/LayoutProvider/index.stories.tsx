import { Story } from '@storybook/react';
import { Space, Typography } from 'antd';
import React from 'react';

import { Button } from '../Button';
import { Table } from '../Table';

import { LayoutContextValues, LayoutProvider } from './index';

export default {
  title: 'LayoutProvider',
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

export const Default: Story<Parameters<typeof LayoutProvider>[0]['value']> = (
  args,
) => (
  <LayoutProvider
    value={{
      size: args.size,
      fontSize: args.fontSize,
    }}
  >
    <Components />
  </LayoutProvider>
);

export const NestedOverwrite: Story<
  Parameters<typeof LayoutProvider>[0]['value']
> = (args) => (
  <LayoutProvider
    value={{
      size: 'large',
      fontSize: '30px',
    }}
  >
    <Typography.Paragraph>
      When multiple LayoutProviders are nested, components get values from the
      closest LayoutProvider.
    </Typography.Paragraph>
    <LayoutProvider
      value={{
        size: args.size,
        fontSize: args.fontSize,
      }}
    >
      <Button>Button</Button>
    </LayoutProvider>
  </LayoutProvider>
);

export const PropsHavePriority: Story<
  Parameters<typeof LayoutProvider>[0]['value']
> = (args) => (
  <LayoutProvider
    value={{
      size: args.size,
      fontSize: args.fontSize,
    }}
  >
    <Typography.Paragraph>
      Props get passed directly to the components and have priority over the
      values of LayoutProvider which are passed.
    </Typography.Paragraph>
    <Components fontSize="14px" size="large" />
  </LayoutProvider>
);

function Components(layoutAsProps?: LayoutContextValues) {
  return (
    <Space direction="vertical" size="middle">
      <Button {...layoutAsProps}>Button</Button>
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
        {...layoutAsProps}
      />
    </Space>
  );
}
