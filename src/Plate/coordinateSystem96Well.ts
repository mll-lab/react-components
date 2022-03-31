import { CoordinateSystem } from './coordinateSystem';
import { Coordinates } from './types';

export class CoordinateSystem96Well extends CoordinateSystem {
  rows(): Array<Coordinates['row']> {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  }

  columns(): Array<Coordinates['column']> {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }
}
