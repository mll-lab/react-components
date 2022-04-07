import { CoordinateSystem } from './coordinateSystem';
import { Columns, Rows } from './types';

export class CoordinateSystem12Well extends CoordinateSystem {
  rows(): Rows {
    return ['A', 'B', 'C'];
  }

  columns(): Columns {
    return [1, 2, 3, 4];
  }
}
