import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { useLayoutContext } from '../LayoutProvider';

export { ColumnsType, ColumnProps } from 'antd/es/table';

export type TableProps<RecordType> = AntdTableProps<RecordType>;

export const StyledTable = styled(AntdTable)<{
  // TODO: fix redundant prop type definitions
  // Props starting with $ are transient props and will not be passed to component
  $fontSize?: string;
}>`
  ${(props) => {
    if (props.onRow?.({})?.onClick) {
      return `
        tbody tr:hover {
          cursor: pointer;
        }
        .mll-ant-table {
          font-size: ${(props.$fontSize || props.theme.fontSize) ?? undefined}
        }
        `;
    }

    return `
      .mll-ant-table {
        font-size: ${(props.$fontSize || props.theme.fontSize) ?? undefined}
      }
    `;
  }}
` as <RecordType extends Record<string, unknown> = Record<string, unknown>>(
  props: TableProps<RecordType> & {
    // Props starting with $ are transient props and will not be passed to component
    $fontSize?: string;
  },
) => ReactElement;

export function Table<
  RecordType extends Record<string, unknown> = Record<string, unknown>,
>(props: TableProps<RecordType>) {
  const layout = useLayoutContext();

  return (
    <StyledTable
      size={props.size ?? layout.size ?? 'middle'}
      $fontSize={layout.fontSize}
      rowKey="id"
      {...props}
    />
  );
}
