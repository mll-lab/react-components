import { EMPTY_ARRAY } from '@mll-lab/js-utils';
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

  if (!onToggle || open === undefined) {
    return (
      <Collapse
        defaultActiveKey={defaultActive ? KEY : undefined}
        {...restCollapseProps}
      >
        <SingleCollapsePanel panelProps={panelProps}>
          {children}
        </SingleCollapsePanel>
      </Collapse>
    );
  }

  return (
    <Collapse
      activeKey={open ? [KEY] : EMPTY_ARRAY}
      onChange={(keys) => {
        if (onToggle && keys?.length > 0) {
          const key = first(keys); // only one key exists
          onToggle(key === KEY);
        }
      }}
      {...restCollapseProps}
    >
      <SingleCollapsePanel panelProps={panelProps}>
        {children}
      </SingleCollapsePanel>
    </Collapse>
  );
}

function SingleCollapsePanel({
  children,
  panelProps,
}: Pick<SingleCollapseProps, 'panelProps' | 'children'>) {
  return (
    <Collapse.Panel key={KEY} {...panelProps}>
      {children}
    </Collapse.Panel>
  );
}
