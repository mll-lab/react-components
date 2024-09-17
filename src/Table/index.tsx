import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { MllSpinnerSvg } from '../Spinner';
import { fontSizeFromTheme } from '../styled-utils';
import { PALETTE } from '../theme';

export {
  ColumnsType,
  ColumnType,
  ColumnGroupType,
  ColumnProps,
  TablePaginationConfig,
} from 'antd/es/table';
export {
  ColumnFilterItem,
  CompareFn,
  FilterDropdownProps,
  SortOrder,
  TableRowSelection,
} from 'antd/es/table/interface';

export * from './utils';

export type TableProps<RecordType> = AntdTableProps<RecordType>;

const StyledTable = styled(AntdTable)`
  .mll-ant-table {
    font-size: ${fontSizeFromTheme};
  }

  /* Avoid raising the "Keine Daten" overlay above elements such as the menu or dropdown, which have z-index 1050 */
  .mll-ant-table-placeholder {
    z-index: 1049 !important;
  }

  ${(props) =>
    // @ts-expect-error TODO it seems unsafe to pass empty data to onRow?
    props.onRow?.({})?.onClick
      ? `
        tbody tr:hover {
          cursor: pointer;
        }
        `
      : ''}
` as <RecordType extends Record<string, unknown> = Record<string, unknown>>(
  props: TableProps<RecordType>,
) => ReactElement;

export function Table<
  RecordType extends Record<string, unknown> = Record<string, unknown>,
>({ loading, ...rest }: TableProps<RecordType>) {
  return (
    <StyledTable
      rowKey="id"
      {...rest}
      loading={
        typeof loading === 'object'
          ? {
              ...loading,
              indicator: loading.indicator ?? MllSpinnerSvg,
              size: loading.size ?? 'large',
            }
          : {
              spinning: Boolean(loading),
              indicator: MllSpinnerSvg,
              size: 'large',
            }
      }
    />
  );
}

/** ag-grid like variant of the default table, has more contrast with other page elements. */
export const ColoredTable = styled(Table)`
  /* Always surround the entire table with a border */
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 2px;

  /* Avoid other borders overlapping with the main border */
  .mll-ant-table table,
  .mll-ant-table .mll-ant-table-container,
  .mll-ant-table.mll-ant-table-bordered .mll-ant-table-container {
    border: none;
  }

  .mll-ant-table.mll-ant-table-bordered .mll-ant-table-container table,
  .mll-ant-table.mll-ant-table-bordered
    .mll-ant-table-container
    .mll-ant-table-content
    table {
    border-top: none;
  }

  /* Show the header in deep blue */
  th.mll-ant-table-cell {
    background-color: ${(props) => props.theme.tableHeaderBackgroundColor};
    color: white;
  }

  /* Less jarring than the default hover color */
  th.mll-ant-table-column-has-sorters:hover {
    background-color: ${(props) => props.theme.borderColor};
  }

  /* Since the background is darker, highlight in white */
  th .mll-ant-table-column-sorter-up.active,
  th .mll-ant-table-column-sorter-down.active {
    color: white;
  }

  /* Maximum contrast */
  td {
    background-color: white;
  }

  /* Do not highlight the sorted column */
  td.mll-ant-table-column-sort {
    background: none;
  }

  /* Increase horizontal space for squished together contents */
  .mll-ant-table.mll-ant-table-small tr td {
    padding-left: 2px;
  }

  /* Stripe rows */

  /* Depending on the table layout, the header may or may not count as a row */
  .mll-ant-table.mll-ant-table-fixed-header tr:nth-child(odd) td,
  .mll-ant-table:not(.mll-ant-table-fixed-header) tr:nth-child(even) td {
    background-color: ${(props) => props.theme.tableRowStripeBackgroundColor};
  }

  /* Still highlight colored rows on hover */
  .mll-ant-table.mll-ant-table-fixed-header
    tr:nth-child(odd)
    td.mll-ant-table-cell-row-hover,
  .mll-ant-table:not(.mll-ant-table-fixed-header)
    tr:nth-child(even)
    td.mll-ant-table-cell-row-hover {
    background-color: ${PALETTE.gray1};
  }

  /* Less contrast and a bit more space in the header */
  .mll-ant-table.mll-ant-table-bordered
    thead.mll-ant-table-thead
    tr
    > th.mll-ant-table-cell {
    border-right: 1px solid ${(props) => props.theme.borderColor};
    padding-left: 2px;
  }

  /* Avoid duplicate border before scrollbar */
  .mll-ant-table-cell-scrollbar {
    box-shadow: none;
  }

  /* Fill out right and left side of the header with the background color */
  .mll-ant-table.mll-ant-table-bordered
    table
    thead.mll-ant-table-thead
    tr
    > th.mll-ant-table-cell.mll-ant-table-selection-column,
  .mll-ant-table.mll-ant-table-bordered
    table
    thead.mll-ant-table-thead
    tr
    > th.mll-ant-table-cell:last-child {
    border-right: 1px solid ${(props) => props.theme.tableHeaderBackgroundColor};
  }

  /* Avoid 1px border of invisible column */
  .mll-ant-table.mll-ant-table-bordered
    table
    tr
    > td.mll-ant-table-cell.mll-ant-table-selection-column {
    border-right: none;
  }

  /* Fill out left and right upper corner background color */
  .mll-ant-table-container table > thead > tr:first-child th:last-child,
  .mll-ant-table-container table > thead > tr:first-child th:first-child {
    border-radius: 0;
  }

  /* Highlight selected row and avoid visibility of rowSelection checkbox  */
  .mll-ant-table tr.mll-ant-table-row.mll-ant-table-row-selected td {
    background-color: ${(props) => props.theme.focusedRowColor};
  }
` as typeof Table;

// Re-define JSX API components, see https://github.com/ant-design/ant-design/blob/a4d139687a6ca5a0abad09ac5cdadce617ccf9ca/components/table/Table.tsx#L548-L550
Table.Column = AntdTable.Column;
Table.ColumnGroup = AntdTable.ColumnGroup;
Table.Summary = AntdTable.Summary;
