import { CoordinateSystem } from './coordinateSystem';
import { Columns, Rows } from './types';

export class CoordinateSystem96Well extends CoordinateSystem {
  rows(): Rows {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  }

  columns(): Columns {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }
}
