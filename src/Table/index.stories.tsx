import { Story } from '@storybook/react';
import { ColumnProps } from 'antd/es/table';
import React from 'react';

import { Table, TableProps } from './index';

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

const columns: Array<ColumnProps<Person>> = [
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

export const Default: Story<TableProps<Person>> = (args) => (
  <Table dataSource={data} columns={columns} rowKey="id" {...args} />
);
