import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import { ReactElement } from 'react';
import styled from 'styled-components';

export type TableProps<RecordType> = AntdTableProps<RecordType>;

export const Table = styled(AntdTable)`
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
