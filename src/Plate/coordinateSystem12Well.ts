import { CoordinateSystem } from './coordinateSystem';
import { Coordinates } from './types';

export class CoordinateSystem12Well extends CoordinateSystem {
  rows(): Array<Coordinates['row']> {
    return ['A', 'B', 'C'];
  }

  columns(): Array<Coordinates['column']> {
    return [1, 2, 3, 4];
  }
}
