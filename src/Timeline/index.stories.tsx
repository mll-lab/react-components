import { Story } from '@storybook/react';
import React from 'react';

import { SingleCollapse } from '../Collapse';

import { Timeline, TimelineProps } from './index';

export default {
  title: 'Timeline',
};

export const Default: Story<TimelineProps> = (args) => (
  <Timeline {...args}>
    <Timeline.Item>
      <SingleCollapse panelProps={{ header: 'Header' }}>
        Content
      </SingleCollapse>
    </Timeline.Item>
    <Timeline.Item>
      <SingleCollapse
        collapseProps={{ defaultActive: true }}
        panelProps={{ header: 'Header' }}
      >
        Content
      </SingleCollapse>
    </Timeline.Item>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
  </Timeline>
);
