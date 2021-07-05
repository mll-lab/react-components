import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import styled from 'styled-components'
import React from 'react';

import { PREFIX_CLS } from '../Provider';

export function Table<
  T extends Record<string, unknown> = Record<string, unknown>
>(props: TableProps<T>) {
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

  return <TableWithPointer {...props} columns={columns} />;
}

export const TableWithPointer = styled(AntdTable)`
  ${props => {
  const onRowImplementation = props.onRow && props.onRow({})
  if (onRowImplementation?.onClick) {
    return `
        tbody tr:hover {
          cursor: pointer;
        }
        `
  }
  return ''
}}
`

export type TableProps<T> = AntdTableProps<T>;
