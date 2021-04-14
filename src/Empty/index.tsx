import { Empty as AntdEmpty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';
import { FC, ReactNode } from 'react';

// We have to redefine this in order to avoid the TypeScript error:
// TS4082: Default export of the module has or is using private name 'EmptyType'.
export type EmptyType = {
  PRESENTED_IMAGE_DEFAULT: ReactNode;
  PRESENTED_IMAGE_SIMPLE: ReactNode;
} & FC<EmptyProps>;

export const Empty: EmptyType = AntdEmpty;
