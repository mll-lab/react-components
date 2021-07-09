import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import React from 'react';

import { PREFIX_CLS } from '../Provider';

export function Table<
  RecordType extends Record<string, unknown> = Record<string, unknown>
>(props: TableProps<RecordType>) {
  const columns = props.columns?.map((column) => {
    if (!column.filterDropdown) {
      return column;
    }

    const FilterDropdown = (filterProps: FilterDropdownProps) => {
      const { filterDropdown } = column;
      if (typeof filterDropdown === 'function') {
        return <div className={PREFIX_CLS}>{filterDropdown(filterProps)}</div>;
      }

      return <div className={PREFIX_CLS}>{filterDropdown}</div>;
    };

    return {
      ...column,
      filterDropdown: FilterDropdown,
    };
  });

  return <AntdTable {...props} columns={columns} />;
}

export type TableProps<RecordType> = AntdTableProps<RecordType>;
