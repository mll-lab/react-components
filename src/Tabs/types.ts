import { ReactNode } from 'react';

export type TabsProps<TTabID = number | string> = {
  children?: ReactNode;

  // Set either both or none of those props
  activeTabID?: TTabID;
  onSelected?: (tabID: TTabID) => void;
};

export type TabPanelProps<TTabID = number | string> = {
  id: TTabID;
  title: ReactNode;
  children?: ReactNode;
};
