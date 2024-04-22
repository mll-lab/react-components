import React, { Reducer, useMemo, useReducer } from 'react';

import { TabsContext, TabsContextProps } from './TabsContext';
import { TabsHeader } from './TabsHeader';
import { TabPanelProps, TabsProps } from './types';

type State<TTabID = number | string> = {
  tabs: Array<TabPanelProps<TTabID>>;
  activeTabID?: TTabID;
};

type Action<TTabID = number | string> =
  | {
      type: 'registerTab';
      newTab: TabPanelProps<TTabID>;
    }
  | {
      type: 'unregisterTab';
      tabID: TTabID;
    }
  | {
      type: 'onSelected';
      tabID: TTabID;
    };

function reducer<TTabID = number | string>(
  state: State<TTabID>,
  action: Action<TTabID>,
): State<TTabID> {
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
        activeTabID:
          state.tabs.length === 0 ? action.newTab.id : state.activeTabID,
      };
    }
    case 'unregisterTab': {
      const tabsWithoutUnregistered = state.tabs.filter(
        (tab) => tab.id !== action.tabID,
      );
      const firstTab = tabsWithoutUnregistered[0];

      return {
        tabs: tabsWithoutUnregistered,
        activeTabID:
          state.activeTabID === action.tabID && firstTab
            ? firstTab.id
            : undefined,
      };
    }
    case 'onSelected': {
      return {
        ...state,
        activeTabID: action.tabID,
      };
    }
  }
}

/**
 * In contrast to the antd Tabs component, this implementation does
 * not require tab panels to be direct children of tabs.
 */
export function Tabs<TTabID = number | string>(props: TabsProps<TTabID>) {
  const [state, dispatch] = useReducer<Reducer<State<TTabID>, Action<TTabID>>>(
    reducer,
    {
      tabs: [],
    },
  );

  const tabsContextProps = useMemo(
    (): TabsContextProps<TTabID> => ({
      tabs: state.tabs,
      registerTab: (newTab) => {
        dispatch({ type: 'registerTab', newTab });
      },
      unregisterTab: (tabID) => {
        dispatch({ type: 'unregisterTab', tabID });
      },
      onSelected:
        props.onSelected ??
        ((tabID) => {
          dispatch({ type: 'onSelected', tabID });
        }),
      activeTabID: props.activeTabID ?? state.activeTabID,
    }),
    [state.tabs, state.activeTabID, props.onSelected, props.activeTabID],
  );

  return (
    // @ts-expect-error TabsContext can not be used generically, as it is a const.
    // Workarounds exist, but they involve more complicated and inefficient code:
    // https://hipsterbrown.com/musings/musing/react-context-with-generics
    // https://ordina-jworks.github.io/architecture/2021/02/12/react-generic-context.html
    <TabsContext.Provider value={tabsContextProps}>
      <TabsHeader />
      {props.children}
    </TabsContext.Provider>
  );
}
