import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { TabsContext } from './TabsContext';
import { TabPanelProps } from './types';

const TitleList = styled.ul`
  padding-left: 0;
  list-style: none;
  margin: 0;
  border-bottom: 1px solid ${(props) => props.theme.dividerColor};
`;

type TabTitleProps = {
  isActiveTab: boolean;
};

const TabTitle = styled.li<TabTitleProps>`
  font-weight: 600;
  padding: 16px 30px;
  cursor: pointer;
  opacity: 0.4;
  display: inline-block;
  border-bottom: solid 3px transparent;

  :hover {
    opacity: 1;
    border-bottom: solid 3px ${(props) => props.theme.borderColor};
  }

  ${(props) =>
    props.isActiveTab &&
    css`
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      cursor: default;
      opacity: 1;
      border-bottom: solid 3px ${props.theme.borderColor};
    `}
`;

export function TabsHeader() {
  const context = useContext(TabsContext);

  return (
    <TitleList>
      {context.tabs.map((tab: TabPanelProps) => {
        const isActiveTab = context.activeTabId === tab.id;

        return (
          <TabTitle
            key={tab.id}
            id={String(tab.id)}
            isActiveTab={isActiveTab}
            aria-selected={isActiveTab}
            tabIndex={0}
            onClick={() => context.onSelected(tab.id)}
            onKeyPress={(event) =>
              event.key === 'Enter' && context.onSelected(tab.id)
            }
          >
            {tab.title}
          </TabTitle>
        );
      })}
    </TitleList>
  );
}
