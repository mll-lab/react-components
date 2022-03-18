import {
  Collapse as AntdCollapse,
  CollapseProps as AntdCollapseProps,
  CollapsePanelProps as AntdCollapsePanelProps,
} from 'antd';
import { first } from 'lodash';
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
    open?: boolean;
    onToggle?: (open: boolean) => void;
  };
  panelProps: Omit<CollapsePanelProps, 'key'>;
  children: ReactNode;
};

export function SingleCollapse({
  collapseProps = {},
  panelProps,
  children,
}: SingleCollapseProps) {
  const { open, onToggle, defaultActive, ...restCollapseProps } = collapseProps;
  return (
    <Collapse
      defaultActiveKey={defaultActive ? KEY : undefined}
      activeKey={open ? KEY : undefined}
      onChange={(keys) => {
        const key = first(keys); // only one key exists
        onToggle?.(key === KEY);
      }}
      {...restCollapseProps}
    >
      <Collapse.Panel key={KEY} {...panelProps}>
        {children}
      </Collapse.Panel>
    </Collapse>
  );
}
