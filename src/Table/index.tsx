import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { useLayoutContext } from '../LayoutProvider';
import { Layout } from '../theme';

export { ColumnsType, ColumnProps } from 'antd/es/table';

export type TableProps<RecordType> = AntdTableProps<RecordType> & {
  fontSize?: string;
};

export const StyledTable = styled(AntdTable)<TableProps<unknown>>`
  ${(props) => {
    if (props.onRow?.({})?.onClick) {
      return `
        tbody tr:hover {
          cursor: pointer;
        }
        .mll-ant-table {
          font-size: ${(props.fontSize || props.theme.fontSize) ?? undefined}
        }
        `;
    }

    return `
      .mll-ant-table {
        font-size: ${(props.fontSize || props.theme.fontSize) ?? undefined}
      }
    `;
  }}
` as <RecordType extends Record<string, unknown> = Record<string, unknown>>(
  props: TableProps<RecordType>,
) => ReactElement;

export function Table<
  RecordType extends Record<string, unknown> = Record<string, unknown>,
>(props: TableProps<RecordType>) {
  const layout = useLayoutContext();

  const size: TableProps<RecordType>['size'] =
    props.size ?? layout.size ?? 'middle';

  return (
    <StyledTable
      size={mapSize(size)}
      fontSize={layout.fontSize}
      rowKey="id"
      {...props}
    />
  );
}

function mapSize(size: Layout['size']): SizeType {
  // large is not designed by antd right now (though SizeType would suggest that)
  if (size === 'large') {
    return 'middle';
  }
  return size;
}
