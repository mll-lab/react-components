import { first } from 'lodash';
import React, { ReactNode } from 'react';

import { Collapse, CollapsePanelProps, CollapseProps } from './Collapse';

const KEY = 'default';

type SingleCollapseProps = {
  collapse?: Omit<CollapseProps, 'activeKey' | 'defaultActiveKey'> & {
    onToggle?: (open: boolean) => void;
    open?: boolean;
    defaultActive?: boolean;
  };
  panel: Omit<CollapsePanelProps, 'key'>;
  children: ReactNode;
};

export function SingleCollapse({
  children,
  collapse,
  panel,
}: SingleCollapseProps) {
  const isControlled = collapse?.open !== undefined;
  if (isControlled) {
    return (
      <Collapse
        {...collapse}
        activeKey={collapse.open ? KEY : undefined}
        onChange={(keys) => {
          const key = typeof keys === 'string' ? keys : first(keys);
          collapse.onToggle?.(key === KEY);

          return collapse.onChange?.(keys);
        }}
      >
        <Collapse.Panel {...panel} key={KEY}>
          {children}
        </Collapse.Panel>
      </Collapse>
    );
  }

  return (
    <Collapse
      {...collapse}
      defaultActiveKey={collapse?.defaultActive ? KEY : undefined}
    >
      <Collapse.Panel {...panel} key={KEY}>
        {children}
      </Collapse.Panel>
    </Collapse>
  );
}
