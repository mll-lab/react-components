import { CoordinateSystem } from './coordinateSystem';
import { CoordinateColumns, CoordinateRows } from './types';

export class CoordinateSystem96Well extends CoordinateSystem {
  rows(): CoordinateRows {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  }

  columns(): CoordinateColumns {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }
}
