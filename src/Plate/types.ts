import { Props } from '@dnd-kit/core/dist/components/DndContext/DndContext';
import { Maybe } from '@mll-lab/js-utils';
import { ReactNode } from 'react';

import { CoordinateSystem } from './coordinateSystem';
import { Coordinates } from './coordinates';

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
  coordinates: Coordinates;
  content?: Maybe<ReactNode>;
  color?: Maybe<string>;
};

export type PlateProps = {
  coordinateSystem: CoordinateSystem;
  data: Maybe<Array<PlateWell>>;
  loading?: boolean;
  /** Activates DragAndDrop of the wells */
  isDraggable?: boolean;
  /** Do not add props.dndContextProps conditionally, as it leads to problems. Use props.isDraggable instead. */
  dndContextProps?: Props;
};
