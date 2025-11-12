import { CoordinateSystem } from './types';

export const COORDINATE_SYSTEM_6X4 = {
  rows: ['A', 'B', 'C', 'D'],
  columns: [1, 2, 3, 4, 5, 6],
} as const satisfies CoordinateSystem;

export type CoordinateSystem6x4 = typeof COORDINATE_SYSTEM_6X4;
