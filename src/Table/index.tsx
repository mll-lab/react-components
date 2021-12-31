import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { useTheme } from '../theme';

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
  const { size } = useTheme();

  return <StyledTable rowKey="id" size={mapSize(size)} {...props} />;
}

function mapSize(size: SizeType): SizeType {
  // large is not designed by antd right now (though SizeType contains 'large')
  if (size === 'large') {
    return 'default';
  }
  return size;
}
