import React from 'react';

import { PLATE_FLOW } from './constants';
import { CoordinateSystem } from './types';
import { rowForPosition } from './utils';

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
        {rowForPosition(props.position, PLATE_FLOW, props.coordinateSystem)}
      </strong>
    </span>
  );
}
