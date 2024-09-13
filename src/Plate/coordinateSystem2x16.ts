import { CoordinateSystem } from './types';

export const COORDINATE_SYSTEM_2x16 = {
  rows: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
  ],
  columns: [1, 2],
} as const satisfies CoordinateSystem;

export type CoordinateSystem2x16 = typeof COORDINATE_SYSTEM_2x16;
