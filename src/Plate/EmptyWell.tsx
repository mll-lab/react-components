import { useDroppable } from '@dnd-kit/core';
import React from 'react';

import { PALETTE } from '../theme';

import { PLATE_FLOW } from './constants';
import { columnForPosition, rowForPosition } from './utils';
import { GENERAL_WELL_STYLE } from './wellUtils';

export function EmptyWell(props: { position: number }) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.position,
    data: {
      coordinate: {
        row: rowForPosition(props.position, PLATE_FLOW),
        column: columnForPosition(props.position, PLATE_FLOW),
      },
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        ...GENERAL_WELL_STYLE,
        borderColor: isOver ? PALETTE.red : 'inherit',
        color: PALETTE.gray1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <small>
        {rowForPosition(props.position, PLATE_FLOW) +
          columnForPosition(props.position, PLATE_FLOW)}
      </small>
    </div>
  );
}
