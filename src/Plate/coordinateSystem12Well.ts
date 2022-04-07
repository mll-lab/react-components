import { CoordinateSystem } from './coordinateSystem';
import { CoordinateColumns, CoordinateRows } from './types';

export class CoordinateSystem12Well extends CoordinateSystem {
  rows(): CoordinateRows {
    return ['A', 'B', 'C'];
  }

  columns(): CoordinateColumns {
    return [1, 2, 3, 4];
  }
}
