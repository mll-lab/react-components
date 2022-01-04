import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

export { ColumnsType, ColumnProps } from 'antd/es/table';

export type TableProps<RecordType> = AntdTableProps<RecordType>;

export const StyledTable = styled(AntdTable)`
  ${(props) => {
    if (props.onRow?.({})?.onClick) {
      return `
        tbody tr:hover {
          cursor: pointer;
        }
        `;
    }

    return '';
  }}
` as <RecordType extends Record<string, unknown> = Record<string, unknown>>(
  props: TableProps<RecordType>,
) => ReactElement;

export function Table<
  RecordType extends Record<string, unknown> = Record<string, unknown>,
>(props: TableProps<RecordType>) {
  return <StyledTable rowKey="id" {...props} />;
}

// Re-define JSX API components, see https://github.com/ant-design/ant-design/blob/a4d139687a6ca5a0abad09ac5cdadce617ccf9ca/components/table/Table.tsx#L548-L550
Table.Column = AntdTable.Column;
Table.ColumnGroup = AntdTable.ColumnGroup;
Table.Summary = AntdTable.Summary;
