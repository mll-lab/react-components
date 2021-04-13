import { ReactNode } from 'react';

export type TabPanelProps = {
  id: number | string;
  title: ReactNode;
  children?: ReactNode;
};
