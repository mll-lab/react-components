import { Story } from '@storybook/react';
import { TabsProps } from 'antd';
import React, { ComponentType, ReactElement } from 'react';

import { TabPanelProps } from './types';

import { Tabs, TabPanel } from './index';

function dummyHOC<P extends TabPanelProps>(WrappedComponent: ComponentType<P>) {
  const SomeWrappedComponent = (props: P) => (
    <WrappedComponent {...props} foo="bar" />
  );

  return SomeWrappedComponent;
}

const DummyRenderPropComponent = ({
  render,
  id,
  title,
}: {
  render: (props: TabPanelProps) => ReactElement;
} & TabPanelProps) => render({ id, title });

export default {
  title: 'Tabs',
};

export const Controlled: Story<TabsProps> = (args) => {
  const SingleTab = ({ id, title }: TabPanelProps) => (
    <TabPanel id={id} title={title}>
      <div>tab 1</div>
    </TabPanel>
  );

  const WrappedTab = dummyHOC(SingleTab);

  return (
    <Tabs {...args}>
      <>
        <TabPanel id={1} title="Direct usage">
          <div>Direct usage</div>
        </TabPanel>
        <WrappedTab id={2} title="HOC" />
        <DummyRenderPropComponent
          render={SingleTab}
          id={3}
          title="Render prop"
        />
        <div
          style={{
            backgroundColor: 'red',
          }}
        >
          <DummyRenderPropComponent
            render={WrappedTab}
            id={4}
            title="HOC + Render prop"
          />
        </div>
      </>
    </Tabs>
  );
};

Controlled.argTypes = {
  activeTabId: {
    control: {
      type: 'inline-radio',
      options: [1, 2, 3, 4],
      default: 1,
    },
  },
};

export const Uncontrolled: Story = () => (
  <Tabs>
    <TabPanel id={1} title="first">
      first
    </TabPanel>
    <TabPanel id={2} title="second">
      second
    </TabPanel>
  </Tabs>
);
