import { Props } from '@dnd-kit/core/dist/components/DndContext/DndContext';
import { ReactNode } from 'react';

import { Coordinate } from './coordinate';
import { CoordinateSystem } from './coordinateSystem';

export type CoordinateRow = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type CoordinateRows = [CoordinateRow, ...Array<CoordinateRow>];
export type CoordinateColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type CoordinateColumns = [CoordinateColumn, ...Array<CoordinateColumn>];

export type CoordinatesXXXX = {
  row: CoordinateRow;
  column: CoordinateColumn;
};

export type FlowDirection = 'row' | 'column';

export type PlateWell = {
  coordinate: Coordinate;
  content?: ReactNode;
  color?: string;
};

export type PlateProps = {
  coordinateSystem: CoordinateSystem;
  data: Array<PlateWell> | null;
  loading?: boolean;
  /** Activates DragAndDrop of the wells */
  isDraggable?: boolean;
  /** Do not add props.dndContextProps conditionally, as it leads to problems. Use props.isDraggable instead. */
  dndContextProps?: Props;
};
