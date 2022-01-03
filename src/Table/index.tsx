import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { MllSpinnerSvg } from '../Spinner';

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

function loadingProps<T>({ loading }: TableProps<T>): TableProps<T>['loading'] {
  if (loading && typeof loading === 'object') {
    return {
      spinning: loading.spinning,
      indicator: loading.indicator ?? MllSpinnerSvg,
      size: loading.size ?? 'large',
    };
  }
  return {
    spinning: loading,
    indicator: MllSpinnerSvg,
    size: 'large',
  };
}

export function Table<
  RecordType extends Record<string, unknown> = Record<string, unknown>,
>(props: TableProps<RecordType>) {
  return <StyledTable rowKey="id" {...props} loading={loadingProps(props)} />;
}
