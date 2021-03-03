import { ReactNode } from 'react';

export interface TabPanelProps {
  id: number | string;
  title: ReactNode;
  children?: ReactNode;
}
