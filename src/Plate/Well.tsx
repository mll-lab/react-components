import { Maybe } from '@mll-lab/js-utils';
import React from 'react';

import { EmptyWell } from './EmptyWell';
import { FilledWell } from './FilledWell';
import { CoordinateSystem } from './coordinateSystem';
import { PlateWell } from './types';

export function Well({
  coordinateSystem,
  position,
  well,
  isDraggable,
}: {
  coordinateSystem: CoordinateSystem;
  position: number;
  well: Maybe<PlateWell>;
  isDraggable: boolean;
}) {
  return well?.content ? (
    <FilledWell
      well={well}
      position={position}
      isDraggable={isDraggable}
      coordinateSystem={coordinateSystem}
    />
  ) : (
    <EmptyWell position={position} coordinateSystem={coordinateSystem} />
  );
}
