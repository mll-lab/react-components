import React from 'react';

import { TabPanelProps } from './types';

type ContextProps = {
  tabs: Array<TabPanelProps>;
  registerTab: (tab: TabPanelProps) => void;
  unregisterTab: (tabId: number | string) => void;
  onSelected: (tabId: number | string) => void;
  activeTabId?: number | string;
};

export const TabsContext = React.createContext<ContextProps>({
  tabs: [],
  registerTab: () => {},
  unregisterTab: () => {},
  onSelected: () => {},
});
