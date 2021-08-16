import { Story } from '@storybook/react';
import React from 'react';

import { Collapse, CollapseProps } from './index';

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
