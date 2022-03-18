import { ClockCircleOutlined } from '@ant-design/icons';
import { Story } from '@storybook/react';
import React from 'react';

import { CreateButton } from '../Button';
import {
  Default as DefaultCollapseStory,
  Single as SingleCollapseStory,
  // eslint-disable-next-line import/extensions
} from '../Collapse/index.stories';
import { Form } from '../Form';
import { Provider } from '../Provider';
import { Radio } from '../Radio';
import { Space } from '../Space';
import { Table } from '../Table';
import { Tag } from '../Tag';
import { Typography } from '../Typography';
import { Theme } from '../theme';

export default {
  title: 'Provider',
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
    <SupportedComponents />
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
      When multiple Providers are nested, components get values from the closest
      Provider.
    </Typography.Paragraph>
    <Provider
      theme={{
        size: args.size,
        fontSize: args.fontSize,
      }}
    >
      <SupportedComponents />
    </Provider>
  </Provider>
);

export const NestedOverwriteOnlyFontSize: Story = (args) => (
  <Provider
    theme={{
      size: 'small',
      fontSize: '30px',
    }}
  >
    <Typography.Paragraph>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      When a nested provider overwrites only some values, the parent provider's
      other values still apply.
    </Typography.Paragraph>
    <Provider
      theme={{
        fontSize: args.fontSize,
      }}
    >
      <SupportedComponents />
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
      <Table size="large" columns={TABLE_COLUMNS} dataSource={TABLE_DATA} />
    </Space>
  </Provider>
);

function SupportedComponents() {
  return (
    <Space direction="vertical">
      <CreateButton />
      <Table columns={TABLE_COLUMNS} dataSource={TABLE_DATA} />
      <Radio.Group
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
        ]}
      />
      <Radio value="a">Radio outside of group</Radio>
      <Radio.Group
        optionType="button"
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
        ]}
      />
      <Radio.Button value="a">Radio-Button outside of group</Radio.Button>
      <Form>
        <Form.Item label="Form Item">Form item content</Form.Item>
      </Form>
      <Tag icon={<ClockCircleOutlined />} color="default">
        Tag
      </Tag>
      <Tag.CheckableTag checked>Checkable Tag</Tag.CheckableTag>
      <DefaultCollapseStory />
      <SingleCollapseStory />
    </Space>
  );
}

const TABLE_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const TABLE_DATA = [
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
];
