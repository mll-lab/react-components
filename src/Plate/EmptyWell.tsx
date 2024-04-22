import { useDroppable } from '@dnd-kit/core';
import React from 'react';

import { PALETTE } from '../theme';

import { CoordinateSystem } from './coordinateSystem';
import { GENERAL_WELL_STYLE } from './wellUtils';

export function EmptyWell(props: {
  position: number;
  coordinateSystem: CoordinateSystem;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.position,
    data: {
      coordinates: {
        row: props.coordinateSystem.rowForRowFlowPosition(props.position),
        column: props.coordinateSystem.columnForRowFlowPosition(props.position),
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
      <small>
        {props.coordinateSystem.rowForRowFlowPosition(props.position) +
          props.coordinateSystem.columnForRowFlowPosition(props.position)}
      </small>
    </div>
  );
}
