import React, { useMemo, useReducer } from 'react';

import { TabsContext, TabsContextProps } from './TabsContext';
import { TabsHeader } from './TabsHeader';
import { TabPanelProps, TabsProps } from './types';

type State = {
  tabs: Array<TabPanelProps>;
  activeTabId?: number | string;
};

type Action =
  | {
      type: 'registerTab';
      newTab: TabPanelProps;
    }
  | {
      type: 'unregisterTab';
      tabId: number | string;
    }
  | {
      type: 'onSelected';
      tabId: number | string;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'registerTab': {
      const tabWasAlreadyRegistered = state.tabs.some(
        (tab) => tab.id === action.newTab.id,
      );
      if (tabWasAlreadyRegistered) {
        return state;
      }

      return {
        tabs: state.tabs.concat(action.newTab),
        activeTabId:
          state.tabs.length === 0 ? action.newTab.id : state.activeTabId,
      };
    }
    case 'unregisterTab': {
      const tabsWithoutUnregistered = state.tabs.filter(
        (tab) => tab.id !== action.tabId,
      );
      const firstTab = tabsWithoutUnregistered[0];

      return {
        tabs: tabsWithoutUnregistered,
        activeTabId:
          state.activeTabId === action.tabId && firstTab
            ? firstTab.id
            : undefined,
      };
    }
    case 'onSelected': {
      return {
        ...state,
        activeTabId: action.tabId,
      };
    }
  }
}

export function Tabs(props: TabsProps) {
  const [state, dispatch] = useReducer(reducer, { tabs: [] });

  const tabsContextProps = useMemo(
    (): TabsContextProps => ({
      tabs: state.tabs,
      registerTab: (newTab) => {
        dispatch({ type: 'registerTab', newTab });
      },
      unregisterTab: (tabId) => {
        dispatch({ type: 'unregisterTab', tabId });
      },
      onSelected:
        props.onSelected ??
        ((tabId) => {
          dispatch({ type: 'onSelected', tabId });
        }),
      activeTabId: props.activeTabId ?? state.activeTabId,
    }),
    [state.tabs, state.activeTabId, props.onSelected, props.activeTabId],
  );

  return (
    <TabsContext.Provider value={tabsContextProps}>
      <TabsHeader />
      {props.children}
    </TabsContext.Provider>
  );
}
