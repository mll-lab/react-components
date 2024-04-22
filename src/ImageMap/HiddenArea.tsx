import * as React from 'react';

export function HiddenArea(props: {
  key: number;
  position: React.SVGProps<SVGRectElement>;
}) {
  return (
    <rect
      {...props.position}
      style={{
        fill: 'lightgrey',
        fillOpacity: 0.9,
      }}
    />
  );
}
