import React from 'react';

import { CoordinateSystem } from './coordinateSystem';

export function RowLabel(props: {
  position: number;
  coordinateSystem: CoordinateSystem;
}) {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <strong>
        {props.coordinateSystem.rowForRowFlowPosition(props.position)}
      </strong>
    </span>
  );
}
