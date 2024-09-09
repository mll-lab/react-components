import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import { PALETTE } from '../theme';

import { PLATE_FLOW } from './constants';
import { CoordinateSystem, PlateWell } from './types';
import { columnForPosition, rowForPosition } from './utils';
import { GENERAL_WELL_STYLE } from './wellUtils';

export function FilledWell<TCoordinateSystem extends CoordinateSystem>(props: {
  well: PlateWell<TCoordinateSystem>;
  coordinateSystem: TCoordinateSystem;
  position: number;
  isDraggable: boolean;
}) {
  const data = {
    coordinates: {
      row: rowForPosition(props.position, PLATE_FLOW, props.coordinateSystem),
      column: columnForPosition(
        props.position,
        PLATE_FLOW,
        props.coordinateSystem,
      ),
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
