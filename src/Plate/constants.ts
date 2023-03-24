import { range } from 'lodash';

import { Coordinates, FlowDirection } from './types';

const TUBE_COUNT = 96;
export const WELLS = range(1, TUBE_COUNT + 1);
export const COORDINATES_COLUMNS: ReadonlyArray<Coordinates['column']> = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;
export const COORDINATES_ROWS: ReadonlyArray<Coordinates['row']> = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
] as const;
export const PLATE_FLOW: FlowDirection = 'row' as const;
