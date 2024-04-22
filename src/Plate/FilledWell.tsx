import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import { PALETTE } from '../theme';

import { CoordinateSystem } from './coordinateSystem';
import { PlateWell } from './types';
import { GENERAL_WELL_STYLE } from './wellUtils';

export function FilledWell(props: {
  coordinateSystem: CoordinateSystem;
  well: PlateWell;
  position: number;
  isDraggable: boolean;
}) {
  const data = {
    coordinates: {
      row: props.coordinateSystem.rowForRowFlowPosition(props.position),
      column: props.coordinateSystem.columnForRowFlowPosition(props.position),
    },
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.position,
    data,
    disabled: !props.isDraggable,
  });

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        ...GENERAL_WELL_STYLE,
        transform: CSS.Translate.toString(transform),
        backgroundColor: props.well.color ?? PALETTE.gray3,
      }}
    >
      {props.well.content}
    </div>
  );
}
