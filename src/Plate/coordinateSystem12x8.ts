import { CoordinateSystem } from './types';

export const COORDINATE_SYSTEM_12X8 = {
  rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
} as const satisfies CoordinateSystem;

export type CoordinateSystem12x8 = typeof COORDINATE_SYSTEM_12X8;
