import React from 'react';

import { EmptyWell } from './EmptyWell';
import { FilledWell } from './FilledWell';
import { PlateWell } from './types';

export function Well(props: {
  position: number;
  well?: PlateWell;
  isDraggable: boolean;
}) {
  return props.well?.content ? (
    <FilledWell
      well={props.well}
      position={props.position}
      isDraggable={props.isDraggable}
    />
  ) : (
    <EmptyWell position={props.position} />
  );
}
