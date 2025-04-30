import { Props } from '@dnd-kit/core/dist/components/DndContext/DndContext';
import { Maybe } from '@mll-lab/js-utils';
import { ReactNode } from 'react';

export type Coordinates<TCoordinateSystem extends CoordinateSystem> = {
  row: TCoordinateSystem['rows'][number];
  column: TCoordinateSystem['columns'][number];
};

export type FlowDirection = 'row' | 'column';

export type PlateWell<TCoordinateSystem extends CoordinateSystem> = {
  coordinates: Coordinates<TCoordinateSystem>;
  content?: Maybe<ReactNode>;
  color?: Maybe<string>;
};

export type CoordinateSystem = {
  rows: Array<string>;
  columns: Array<number>;
};

export type PlateProps<TCoordinateSystem extends CoordinateSystem> = {
  data: Maybe<Array<PlateWell<TCoordinateSystem>>>;
  coordinateSystem: TCoordinateSystem;
  loading?: Maybe<boolean>;
  /** Activates DragAndDrop of the wells */
  isDraggable?: Maybe<boolean>;
  /** Do not add props.dndContextProps conditionally, as it leads to problems. Use props.isDraggable instead. */
  dndContextProps?: Maybe<Props>;
};
