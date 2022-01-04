import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { MllSpinnerSvg } from '../Spinner';

export { ColumnsType, ColumnProps } from 'antd/es/table';

export type TableProps<RecordType> = AntdTableProps<RecordType>;

export const StyledTable = styled(AntdTable)`
  .mll-ant-table {
    font-size: ${(props) => props.theme.fontSize ?? undefined};
  }

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
  const { loading, ...rest } = props;
  return (
    <StyledTable
      rowKey="id"
      {...rest}
      loading={
        typeof loading === 'object'
          ? {
              spinning: loading.spinning,
              indicator: loading.indicator ?? MllSpinnerSvg,
              size: loading.size ?? 'large',
            }
          : {
              spinning: loading,
              indicator: MllSpinnerSvg,
              size: 'large',
            }
      }
    />
  );
}

// Re-define JSX API components, see https://github.com/ant-design/ant-design/blob/a4d139687a6ca5a0abad09ac5cdadce617ccf9ca/components/table/Table.tsx#L548-L550
Table.Column = AntdTable.Column;
Table.ColumnGroup = AntdTable.ColumnGroup;
Table.Summary = AntdTable.Summary;
