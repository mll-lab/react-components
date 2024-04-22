import { Popover } from 'antd';
import * as React from 'react';

export function PopoverArea(props: {
  key: number;
  content: React.ReactElement;
  position: React.SVGProps<SVGRectElement>;
  title: React.ReactNode;
}) {
  return (
    <Popover content={props.content} title={props.title}>
      <rect
        {...props.position}
        style={{
          stroke: 'red',
          strokeWidth: 4,
          fillOpacity: 0.1,
          strokeOpacity: 0.9,
          cursor: 'pointer',
        }}
      />
    </Popover>
  );
}
