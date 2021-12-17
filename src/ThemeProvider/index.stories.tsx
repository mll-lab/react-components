import { Story } from '@storybook/react';
import { Space, Typography } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { CSSProperties } from 'react';

import { Button, CreateButton } from '../Button';
import { Table } from '../Table';
import { Theme, THEME } from '../theme';

import { ThemeProvider } from '.';

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
  <ThemeProvider
    theme={{
      size: args.size,
      fontSize: args.fontSize,
    }}
  >
    <Components />
  </ThemeProvider>
);

export const NestedOverwrite: Story = (args) => (
  <ThemeProvider
    theme={{
      size: 'large',
      fontSize: '30px',
    }}
  >
    <Typography.Paragraph>
      When multiple ThemeProviders are nested, components get values from the
      closest ThemeProvider.
    </Typography.Paragraph>
    <ThemeProvider
      theme={{
        size: args.size,
        fontSize: args.fontSize,
      }}
    >
      <Button>Button</Button>
    </ThemeProvider>
  </ThemeProvider>
);

export const PropsHavePriority: Story = (args) => (
  <ThemeProvider
    theme={{
      size: args.size,
      fontSize: args.fontSize,
    }}
  >
    <Typography.Paragraph>
      Props get passed directly to the components and have priority over the
      values of ThemeProvider which are passed.
    </Typography.Paragraph>
    <Components size="large" style={{ fontSize: '16px' }} />
  </ThemeProvider>
);

export const NestedThemeProvider: Story = () => (
  <ThemeProvider
    theme={
      {
        ...THEME,
        size: 'small',
        fontSize: '9px',
        successColor: 'red',
      } as typeof THEME
    }
  >
    <ThemeProvider
      theme={{
        size: 'small',
        fontSize: '14px',
      }}
    >
      <Typography.Paragraph>
        Props get passed directly to the components and have priority over the
        values of ThemeProvider which are passed.
      </Typography.Paragraph>
      <Components />
    </ThemeProvider>
  </ThemeProvider>
);

function Components(theme?: { size?: SizeType; style?: CSSProperties }) {
  return (
    <Space direction="vertical" size="middle">
      <CreateButton {...theme}>Button</CreateButton>
      <Table
        {...theme}
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
