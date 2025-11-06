import { StoryFn } from '@storybook/react-webpack5';
import React, { ComponentType, ReactElement } from 'react';

import { TabPanelProps, TabsProps } from './types';

import { TabPanel, Tabs } from './index';

function dummyHOC<P extends TabPanelProps>(WrappedComponent: ComponentType<P>) {
  const SomeWrappedComponent = (props: P) => (
    <WrappedComponent {...props} foo="bar" />
  );

  return SomeWrappedComponent;
}

function DummyRenderPropComponent({
  render,
  id,
  title,
}: {
  render: (props: TabPanelProps) => ReactElement;
} & TabPanelProps) {
  return render({ id, title });
}

function SingleTab({ id, title }: TabPanelProps) {
  return (
    <TabPanel id={id} title={title}>
      <div>tab 1</div>
    </TabPanel>
  );
}

export default {
  title: 'Tabs',
};

export const Controlled: StoryFn<TabsProps> = function Controlled(args) {
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
  activeTabID: {
    control: {
      type: 'inline-radio',
      options: [1, 2, 3, 4],
      default: 1,
    },
  },
};

export const Uncontrolled: StoryFn = function Uncontrolled() {
  return (
    <Tabs>
      <TabPanel id={1} title="first">
        first
      </TabPanel>
      <TabPanel id={2} title="second">
        second
      </TabPanel>
    </Tabs>
  );
};
