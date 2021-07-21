import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { TabPanel, Tabs } from './index';

describe('Tabs', () => {
  it('displays a single tab', () => {
    const title = 'My tab title';
    const content = 'My tab content';
    const { getByText } = render(
      <Tabs>
        <TabPanel id={1} title={title}>
          {content}
        </TabPanel>
      </Tabs>,
    );

    expect(getByText(title)).toHaveAttribute('aria-selected', 'true');
    expect(getByText(content)).toBeVisible();
  });

  it('force renders tab content and keeps it while switching', () => {
    const title1 = 'My tab title1';
    const content1 = 'My tab content1';
    const title2 = 'My tab title2';
    const content2 = 'My tab content2';

    const { getByText } = render(
      <Tabs>
        <TabPanel id={1} title={title1}>
          {content1}
        </TabPanel>
        <TabPanel id={2} title={title2}>
          {content2}
        </TabPanel>
      </Tabs>,
    );

    const header1 = getByText(title1);
    expect(header1).toHaveAttribute('aria-selected', 'true');
    expect(getByText(content1)).toBeVisible();

    const header2 = getByText(title2);
    expect(header2).toHaveAttribute('aria-selected', 'false');
    const tabContent2 = getByText(content2);
    expect(tabContent2).not.toBeVisible();

    fireEvent.click(header2);
    expect(header2).toHaveAttribute('aria-selected', 'true');
    expect(tabContent2).toBeVisible();
  });

  it('set active tab to last tabId', () => {
    const title1 = 'My tab title1';
    const content1 = 'My tab content1';
    const title2 = 'My tab title2';
    const content2 = 'My tab content2';

    const { getByText } = render(
      <Tabs activeTabId={2} onSelected={(tabId) => tabId}>
        <TabPanel id={1} title={title1}>
          {content1}
        </TabPanel>
        <TabPanel id={2} title={title2}>
          {content2}
        </TabPanel>
      </Tabs>,
    );

    const header2 = getByText(title2);
    const tabContent2 = getByText(content2);

    expect(header2).toHaveAttribute('aria-selected', 'true');
    expect(tabContent2).toBeVisible();
  });
});
