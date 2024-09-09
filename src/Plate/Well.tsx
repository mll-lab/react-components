import { Maybe } from '@mll-lab/js-utils';
import React from 'react';

import { EmptyWell } from './EmptyWell';
import { FilledWell } from './FilledWell';
import { CoordinateSystem, PlateWell } from './types';

export function Well<TCoordinateSystem extends CoordinateSystem>(props: {
  position: number;
  well: Maybe<PlateWell<TCoordinateSystem>>;
  coordinateSystem: TCoordinateSystem;
  isDraggable: boolean;
}) {
  return props.well?.content ? (
    <FilledWell
      well={props.well}
      coordinateSystem={props.coordinateSystem}
      position={props.position}
      isDraggable={props.isDraggable}
    />
  ) : (
    <EmptyWell
      position={props.position}
      coordinateSystem={props.coordinateSystem}
    />
  );
}
