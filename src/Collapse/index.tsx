import {
  Collapse as AntdCollapse,
  CollapseProps as AntdCollapseProps,
  CollapsePanelProps as AntdCollapsePanelProps,
} from 'antd';
import React, { ReactNode } from 'react';

export const Collapse: typeof AntdCollapse = AntdCollapse;
export type CollapseProps = AntdCollapseProps;
export type CollapsePanelProps = AntdCollapsePanelProps;

const KEY = 'default';

type SingleCollapseProps = {
  collapseProps?: Omit<CollapseProps, 'activeKey' | 'defaultActiveKey'> & {
    defaultActive?: boolean;
  };
  panelProps: Omit<CollapsePanelProps, 'key'>;
  children: ReactNode;
};

export function SingleCollapse(props: SingleCollapseProps) {
  return (
    <Collapse
      defaultActiveKey={props.collapseProps?.defaultActive ? KEY : undefined}
      {...props.collapseProps}
    >
      <Collapse.Panel key={KEY} {...props.panelProps}>
        {props.children}
      </Collapse.Panel>
    </Collapse>
  );
}
