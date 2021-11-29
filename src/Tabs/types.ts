import { ReactNode } from 'react';

export type TabsProps = {
  children?: ReactNode;

  // Set either both or none of those props
  activeTabId?: number | string;
  onSelected?: (tabId: number | string) => void;
};

export type TabPanelProps = {
  id: number | string;
  title: ReactNode;
  children?: ReactNode;
};
