import { Props } from '@dnd-kit/core/dist/components/DndContext/DndContext';
import { ReactNode } from 'react';

export type Coordinates = {
  row: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  column: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export type FlowDirection = 'row' | 'column';

export type PlateWell = {
  coordinates: Coordinates;
  content?: ReactNode;
  color?: string;
};

/**
 * @typedef {Object} PlatePropsDef
 * @type {object}
 * @param {Array<PlateWell> | null} data
 * @param {undefined|boolean} loading
 * @param {undefined|true} isDraggable activates DragAndDrop of the wells.
 * @param {undefined|Props} dndContextProps: do not add props.dndContextProps conditionally, as it leads to problems. Use props.isDraggable instead.
 */
export type PlateProps = {
  data: Array<PlateWell> | null;
  loading?: boolean;
  dndContextProps?: Props;
  isDraggable?: true;
};
