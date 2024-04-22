import React from 'react';

import { EmptyWell } from './EmptyWell';
import { FilledWell } from './FilledWell';
import { CoordinateSystem } from './coordinateSystem';
import { PlateWell } from './types';

export function Well(props: {
  coordinateSystem: CoordinateSystem;
  position: number;
  well?: PlateWell;
  isDraggable: boolean;
}) {
  return props.well?.content ? (
    <FilledWell
      well={props.well}
      position={props.position}
      isDraggable={props.isDraggable}
      coordinateSystem={props.coordinateSystem}
    />
  ) : (
    <EmptyWell
      position={props.position}
      coordinateSystem={props.coordinateSystem}
    />
  );
}
