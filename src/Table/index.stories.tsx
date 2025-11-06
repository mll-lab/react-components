import { StoryFn } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { action } from 'storybook/test';

import { THEME } from '../theme';

import {
  ColoredTable as StyledTable,
  ColumnProps,
  ColumnsType,
  Table,
  TableProps,
} from './index';

export default {
  title: 'Table',
  component: Table,
  args: {
    loading: false,
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'middle', 'large'],
    },
  },
};

type Person = {
  id: number;
  name: string;
  age: number;
};

const data: Array<Person> = [
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
  {
    id: 3,
    name: 'Joe Black',
    age: 32,
  },
];

const FilterDropdown: ColumnProps<Person>['filterDropdown'] =
  function FilterDropdown() {
    return <div>test</div>;
  };

const columns: ColumnsType<Person> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filterDropdown: FilterDropdown,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const Template: StoryFn<TableProps<Person>> = function Template(args) {
  return <Table<Person> {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  dataSource: data,
  columns,
};

export const TableWithOnRow = Template.bind({});
TableWithOnRow.args = {
  ...Default.args,
  onRow: () => ({
    onClick: action('clicked'),
  }),
};

const renderSummary: TableProps<Person>['summary'] = function renderSummary(
  persons,
) {
  return (
    <Table.Summary.Row style={{ background: THEME.menuGroupBackgroundColor }}>
      <Table.Summary.Cell index={0}>Average age</Table.Summary.Cell>
      <Table.Summary.Cell index={1}>
        {Math.round(
          persons.reduce((sum, person) => sum + person.age, 0) / persons.length,
        )}
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export function TableWithJsxApi() {
  return (
    <Table<Person> dataSource={data} bordered summary={renderSummary}>
      <Table.Column<Person>
        title="Name"
        key="name"
        render={(_, record) => record.name}
      />
      <Table.Column title="Age" dataIndex="age" key="age" />
    </Table>
  );
}

export function ColoredTable() {
  const [selectedID, setSelectedID] = useState<number>();

  return (
    <StyledTable<Person>
      bordered
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={(person) => ({
        onClick: () => setSelectedID(person.id),
      })}
      rowSelection={{
        selectedRowKeys: selectedID ? [selectedID] : undefined,
        hideSelectAll: true,
        renderCell: () => null,
        columnWidth: 0,
      }}
    />
  );
}

export function NestedColoredTable() {
  const [selectedID, setSelectedID] = useState<number>();

  return (
    <StyledTable<Person>
      bordered
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={(person) => ({
        onClick: () => setSelectedID(person.id),
      })}
      rowSelection={{
        selectedRowKeys: selectedID ? [selectedID] : undefined,
        hideSelectAll: true,
        renderCell: () => null,
        columnWidth: 0,
      }}
      expandable={{ expandedRowRender: () => <ColoredTable /> }}
    />
  );
}
