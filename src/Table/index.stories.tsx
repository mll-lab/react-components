import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import { ColumnProps, ColumnsType, Table, TableProps } from './index';

export default {
  title: 'Table',
  component: Table,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    loading: {
      control: 'boolean',
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

const FilterDropdown: ColumnProps<Person>['filterDropdown'] = () => (
  <div>test</div>
);

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

const Template: Story<TableProps<Person>> = (args) => <Table {...args} />;

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
