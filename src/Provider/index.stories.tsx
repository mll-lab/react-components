// false-positive when importing .stories
/* eslint-disable import/extensions */

import { ClockCircleOutlined } from '@ant-design/icons';
import { Story } from '@storybook/react';
import React from 'react';

import { CreateButton } from '../Button/Button';
import {
  CardMeta as CardMetaStory,
  CardsGrid as CardsGridStory,
  Default as CardStory,
  InnerCard as InnerCardStory,
  TabsCard as TabsCardStory,
} from '../Card/index.stories';
import {
  Default as CheckboxStory,
  DisabledCheckbox as DisabledCheckboxStory,
  WithoutLabel as CheckboxWithoutLabelStory,
  WithFormLabel as CheckboxWithFormLabelStory,
} from '../Checkbox/index.stories';
import {
  Default as DefaultCollapseStory,
  Single as SingleCollapseStory,
} from '../Collapse/index.stories';
import { Default as DescriptionsStory } from '../Descriptions/index.stories';
import { Form } from '../Form';
import {
  TextArea as TextAreaStory,
  Number as NumberInputStory,
  NumericID as NumericIDStory,
  Text as TextInputStory,
} from '../Input/index.stories';
import { Radio } from '../Radio';
import {
  Default as SelectStory,
  Multiple as SelectMultipleStory,
  CustomDropdown as SelectCustomDropdownStory,
} from '../Select/index.stories';
import { Space } from '../Space';
import { Default as StepsStory } from '../Steps/index.stories';
import { Table } from '../Table';
import { Tag } from '../Tag';
import { Typography } from '../Typography';
import { Theme } from '../theme';

import { Provider } from '.';

export default {
  title: 'Provider',
  args: {
    size: 'small',
    fontSize: '11px',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'middle', 'large', undefined],
    },
  },
};

export const Default: Story<Theme> = function Default(args) {
  return (
    <Provider
      theme={{
        size: args.size,
        fontSize: args.fontSize,
      }}
    >
      <SupportedComponents />
    </Provider>
  );
};

// AntD applies styles on all labels within its form.
// This story is useful to take care of this behavior.
export const DefaultWithinForm: Story<Theme> = function DefaultWithinForm(
  args,
) {
  return (
    <Provider
      theme={{
        size: args.size,
        fontSize: args.fontSize,
      }}
    >
      <Form>
        <Form.Item>
          <SupportedComponents />
        </Form.Item>
      </Form>
    </Provider>
  );
};

export const NestedOverwrite: Story<Theme> = function NestedOverwrite(args) {
  return (
    <Provider
      theme={{
        size: 'large',
        fontSize: '30px',
      }}
    >
      <Typography.Paragraph>
        When multiple Providers are nested, components get values from the
        closest Provider.
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
};

export const NestedOverwriteOnlyFontSize: Story<Theme> =
  function NestedOverwriteOnlyFontSize(args) {
    return (
      <Provider
        theme={{
          size: 'small',
          fontSize: '30px',
        }}
      >
        <Typography.Paragraph>
          When a nested provider overwrites only some values, the other values
          of the parent provider still apply.
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
  };

export const PropsHavePriority: Story<Theme> = function PropsHavePriority(
  args,
) {
  return (
    <Provider
      theme={{
        size: args.size,
        fontSize: args.fontSize,
      }}
    >
      <Space vertical size="middle">
        <Typography.Paragraph>
          Props get passed directly to the components and have priority.
        </Typography.Paragraph>
        <CreateButton size="large" style={{ fontSize: '16px' }} />
        <Table size="large" columns={TABLE_COLUMNS} dataSource={TABLE_DATA} />
      </Space>
    </Provider>
  );
};

function SupportedComponents() {
  return (
    <Space vertical>
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
        <div>
          <Form.Item label="Nested Form Item">
            Nested form item content
          </Form.Item>
        </div>
      </Form>
      <Tag icon={<ClockCircleOutlined />} color="default">
        Tag
      </Tag>
      <Tag.CheckableTag checked>Checkable Tag</Tag.CheckableTag>
      <DefaultCollapseStory />
      <SingleCollapseStory />
      <TextInputStory />
      <NumberInputStory />
      <NumericIDStory />
      <TextAreaStory />
      <CheckboxStory />
      <DisabledCheckboxStory />
      <CheckboxWithoutLabelStory />
      <CheckboxWithFormLabelStory />
      <SelectStory />
      <SelectMultipleStory />
      <SelectCustomDropdownStory />
      <CardStory />
      <InnerCardStory />
      <TabsCardStory />
      <CardsGridStory />
      <CardMetaStory />
      <StepsStory />
      <DescriptionsStory />
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
