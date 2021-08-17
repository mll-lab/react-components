import {
  Timeline as AntdTimeline,
  TimelineProps as AntdTimelineProps,
  TimelineItemProps as AntdTimelineItemProps,
} from 'antd';
import React, { ReactNode } from 'react';

import { Collapse, CollapsePanelProps, CollapseProps } from '../Collapse';

export const Timeline: typeof AntdTimeline = AntdTimeline;
export type TimelineProps = AntdTimelineProps;
export type TimelineItemProps = AntdTimelineItemProps;

export function CollapsibleTimelineItem(props: {
  timelineItemProps?: TimelineItemProps;
  collapseProps?: Omit<CollapseProps, 'defaultActiveKey'> & {
    defaultActive: boolean;
  };
  collapsePanelProps: Omit<CollapsePanelProps, 'key'>;
  children: ReactNode;
}) {
  const key = 'default';
  return (
    <Timeline.Item {...props.timelineItemProps}>
      <Collapse
        defaultActiveKey={props.collapseProps?.defaultActive ? key : undefined}
        {...props.collapseProps}
      >
        <Collapse.Panel key={key} {...props.collapsePanelProps}>
          {props.children}
        </Collapse.Panel>
      </Collapse>
    </Timeline.Item>
  );
}
