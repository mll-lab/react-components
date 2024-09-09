import { useDroppable } from '@dnd-kit/core';
import React from 'react';

import { PALETTE } from '../theme';

import { CoordinateSystem } from './coordinateSystem';
import { GENERAL_WELL_STYLE } from './wellUtils';

export function EmptyWell({
  position,
  coordinateSystem,
}: {
  position: number;
  coordinateSystem: CoordinateSystem;
}) {
  const row = coordinateSystem.rowForRowFlowPosition(position);
  const column = coordinateSystem.columnForRowFlowPosition(position);

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
