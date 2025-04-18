import { Maybe } from '@mll-lab/js-utils';
import React from 'react';

import { EmptyWell } from './EmptyWell';
import { FilledWell } from './FilledWell';
import { CoordinateSystem, PlateWell } from './types';

export function Well<TCoordinateSystem extends CoordinateSystem>({
  coordinateSystem,
  isDraggable,
  position,
  well,
}: {
  coordinateSystem: TCoordinateSystem;
  isDraggable: boolean;
  position: number;
  well: Maybe<PlateWell<TCoordinateSystem>>;
}) {
  return well?.content ? (
    <FilledWell
      well={well}
      coordinateSystem={coordinateSystem}
      position={position}
      isDraggable={isDraggable}
    />
  ) : (
    <EmptyWell position={position} coordinateSystem={coordinateSystem} />
  );
}
