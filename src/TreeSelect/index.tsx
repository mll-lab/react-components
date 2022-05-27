import {
  TreeSelect as AntdTreeSelect,
  TreeSelectProps as AntdTreeSelectProps,
} from 'antd';

export type TreeSelectProps<T> = AntdTreeSelectProps<T>;
export const TreeSelect: typeof AntdTreeSelect = AntdTreeSelect;
