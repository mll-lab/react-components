import { Popover } from 'antd';
import * as React from 'react';

export function PopOverArea(props: {
  key: number;
  content: React.ReactElement;
  position: React.SVGProps<SVGRectElement>;
  title: React.ReactNode;
}) {
  const rect = (
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
  );

  return (
    <Popover content={props.content} title={props.title}>
      {rect}
    </Popover>
  );
}
