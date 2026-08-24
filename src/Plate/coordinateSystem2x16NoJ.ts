import { CoordinateSystem } from './types';

/**
 * The Tecan MM block has no J on its rows.
 * Mirrors MLL\Utils\Microplate\CoordinateSystem2x16NoJ.
 */
export const COORDINATE_SYSTEM_2X16_NO_J = {
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
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
  ],
  columns: [1, 2],
} as const satisfies CoordinateSystem;

export type CoordinateSystem2x16NoJ = typeof COORDINATE_SYSTEM_2X16_NO_J;
