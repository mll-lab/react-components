import React, { useContext, useEffect } from 'react';

import { TabsContext } from './TabsContext';
import { TabPanelProps } from './types';

export function TabPanel(props: TabPanelProps) {
  const context = useContext(TabsContext);

  useEffect(() => {
    context.registerTab({
      id: props.id,
      title: props.title,
    });

    return () => {
      context.unregisterTab(props.id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, props.title]);

  return (
    <div
      style={{
        display: context.activeTabID === props.id ? 'block' : 'none',
      }}
    >
      {props.children}
    </div>
  );
}
