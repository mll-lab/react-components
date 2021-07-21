import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';

export const Table: typeof AntdTable = AntdTable;
export type TableProps<RecordType> = AntdTableProps<RecordType>;
