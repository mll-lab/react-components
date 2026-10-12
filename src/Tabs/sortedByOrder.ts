import { TabPanelProps } from './types';

export function sortedByOrder<TTabID>(
  tabs: Array<TabPanelProps<TTabID>>,
): Array<TabPanelProps<TTabID>> {
  return [...tabs].sort((tab, other) => (tab.order ?? 0) - (other.order ?? 0));
}
