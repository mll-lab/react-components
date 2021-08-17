import { Story } from '@storybook/react';
import React from 'react';

import { CollapsibleTimelineItem, Timeline, TimelineProps } from './index';

export default {
  title: 'Timeline',
};

export const Default: Story<TimelineProps> = (args) => (
  <Timeline {...args}>
    <CollapsibleTimelineItem collapsePanelProps={{ header: 'Header' }}>
      Content
    </CollapsibleTimelineItem>
    <CollapsibleTimelineItem
      collapseProps={{ defaultActive: true }}
      collapsePanelProps={{ header: 'Header' }}
    >
      Content
    </CollapsibleTimelineItem>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
  </Timeline>
);
