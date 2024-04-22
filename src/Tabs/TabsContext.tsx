import React from 'react';

import { TabPanelProps } from './types';

export type TabsContextProps<TTabID = number | string> = {
  tabs: Array<TabPanelProps<TTabID>>;
  registerTab: (tab: TabPanelProps<TTabID>) => void;
  unregisterTab: (tabID: TTabID) => void;
  onSelected: (tabID: TTabID) => void;
  activeTabID?: TTabID;
};

export const TabsContext = React.createContext<TabsContextProps>({
  tabs: [],
  registerTab: () => {},
  unregisterTab: () => {},
  onSelected: () => {},
});
