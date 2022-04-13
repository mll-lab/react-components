import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { Input } from '../Input';

import { Collapse, CollapseProps, SingleCollapse } from './index';

export default {
  title: 'Collapse',
};

export const Default: Story<CollapseProps> = (args) => (
  <Collapse defaultActiveKey={['1']} {...args}>
    <Collapse.Panel header="This is panel header 1" key="1">
      <p>test1</p>
    </Collapse.Panel>
    <Collapse.Panel header="This is panel header 2" key="2">
      <p>test2</p>
    </Collapse.Panel>
    <Collapse.Panel header="This is panel header 3" key="3">
      <p>test3</p>
    </Collapse.Panel>
  </Collapse>
);

export const DefaultWithComponentInHeader: Story<CollapseProps> = (args) => (
  <Collapse defaultActiveKey={['1']} {...args}>
    <Collapse.Panel header={<Input value="Some text" />} key="1">
      <p>test1</p>
    </Collapse.Panel>
  </Collapse>
);

export const Single: Story = () => (
  <SingleCollapse
    panel={{ header: 'Uncontrolled collapse, closed by default' }}
  >
    <p>Collapse content</p>
  </SingleCollapse>
);

export const SingleWithOpenDefault: Story = () => (
  <SingleCollapse
    panel={{ header: 'Uncontrolled collapse, open by default' }}
    collapse={{ defaultActive: true }}
  >
    <p>Collapse content</p>
  </SingleCollapse>
);

export const SingleControlled: Story = () => {
  const [open, setOpen] = useState(true);

  return (
    <SingleCollapse
      collapse={{
        open,
        onToggle: setOpen,
      }}
      panel={{ header: 'Controlled collapse, open by default' }}
    >
      <p>Collapse content</p>
    </SingleCollapse>
  );
};
