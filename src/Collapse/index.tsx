import {
  Collapse as AntdCollapse,
  CollapseProps as AntdCollapseProps,
  CollapsePanelProps as AntdCollapsePanelProps,
} from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type CollapseProps = AntdCollapseProps;
export type CollapsePanelProps = AntdCollapsePanelProps;

const StyledCollapse: typeof AntdCollapse = styled(
  AntdCollapse,
)<AntdCollapseProps>`
  font-size: ${fontSizeFromTheme};
  .mll-ant-collapse-item > .mll-ant-collapse-header .mll-ant-collapse-arrow {
    font-size: ${fontSizeFromTheme};
  }
`;

export const Collapse: typeof AntdCollapse = StyledCollapse;
Collapse.Panel = AntdCollapse.Panel;

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
