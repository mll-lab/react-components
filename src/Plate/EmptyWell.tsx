import { useDroppable } from '@dnd-kit/core';
import React from 'react';

import { PALETTE } from '../theme';

import { PLATE_FLOW } from './constants';
import { CoordinateSystem } from './types';
import { columnForPosition, rowForPosition } from './utils';
import { GENERAL_WELL_STYLE } from './wellUtils';

export function EmptyWell<TCoordinateSystem extends CoordinateSystem>({
  coordinateSystem,
  position,
}: {
  coordinateSystem: TCoordinateSystem;
  position: number;
}) {
  const row = rowForPosition(position, PLATE_FLOW, coordinateSystem);
  const column = columnForPosition(position, PLATE_FLOW, coordinateSystem);

  const { setNodeRef, isOver } = useDroppable({
    id: position,
    data: {
      coordinates: {
        row,
        column,
      },
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        ...GENERAL_WELL_STYLE,
        borderColor: isOver ? PALETTE.red : undefined,
        color: PALETTE.gray1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <small>{row + column}</small>
    </div>
  );
}
