import { TableProps as AntdTableProps } from 'antd';
import { createContext, useContext } from 'react';

import { Layout, LAYOUTS } from '../theme';

export { ColumnsType, ColumnProps } from 'antd/es/table';

export type TableProps<RecordType> = AntdTableProps<RecordType>;

export type LayoutContextValues = {
  layout: Layout;
};

export const LayoutContext = createContext<LayoutContextValues>({
  layout: LAYOUTS.default,
});

export const LayoutProvider = LayoutContext.Provider;

export const useLayoutContext = () => useContext(LayoutContext);
