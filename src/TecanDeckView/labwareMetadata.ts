import type { CoordinateSystem } from '../Plate';
import {
  COORDINATE_SYSTEM_12X8,
  COORDINATE_SYSTEM_2X16,
  COORDINATE_SYSTEM_6X4,
} from '../Plate';

import { GridCell, GridPosition, LabwareKey, TecanLabwares } from './types';

export const COLUMN_LEFT_SPANNING = 0; // Left column that spans all three rows (mmPlate)
export const COLUMN_RIGHT_SPANNING = 4; // Right column that spans all three rows (destPcr1, destPcr2)

type LabwareMetadata = {
  label: string;
  shortLabel: string;
  color: string;
  gridPosition: GridPosition;
  /**
   * Standard mappings per Tecan deck layout:
   * - mmPlate: 2x16 (master mix tubes)
   * - aPlate, bPlate: 6x4 (reagent plates)
   * - All other positions: 12x8 (standard PCR plates)
   */
  coordinateSystem: CoordinateSystem;
};

/* eslint-disable @mll-lab/no-color-literals -- Hardware-specific colors must match physical Tecan deck appearance */
const LABWARE_COLOR_MASTERMIX_PLATE = '#72be98';
const LABWARE_COLOR_STANDARD_PLATE = '#5598be';
const LABWARE_COLOR_TAQMAN_DARK = '#4a4a4a';
const LABWARE_COLOR_FLUIDX = '#b3b3b3';
/* eslint-enable @mll-lab/no-color-literals */

export const LABWARE_METADATA: Record<LabwareKey, LabwareMetadata> = {
  mmPlate: {
    label: 'MM Plate',
    shortLabel: 'MM',
    color: LABWARE_COLOR_MASTERMIX_PLATE,
    gridPosition: { row: 0, column: 0 },
    coordinateSystem: COORDINATE_SYSTEM_2X16,
  },
  aPlate: {
    label: 'A Plate (200µl #1)',
    shortLabel: 'A',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: 1 },
    coordinateSystem: COORDINATE_SYSTEM_6X4,
  },
  nemoDilution: {
    label: 'NeMo Dilution',
    shortLabel: 'NeMoDilution',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: 2 },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
  destPcr: {
    label: 'Dest PCR',
    shortLabel: 'DestPCR',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: 3 },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
  destPcr1: {
    label: 'Dest PCR 1',
    shortLabel: 'DestPCR1',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: COLUMN_RIGHT_SPANNING },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
  destPcr2: {
    label: 'Dest PCR 2',
    shortLabel: 'DestPCR2',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: COLUMN_RIGHT_SPANNING },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
  bPlate: {
    label: 'B Plate (200µl #2)',
    shortLabel: 'B',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 1, column: 1 },
    coordinateSystem: COORDINATE_SYSTEM_6X4,
  },
  nemoDestPcr2: {
    label: 'NeMo Dest PCR 2',
    shortLabel: 'DestPCR2',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 1, column: 2 },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
  destLc: {
    label: 'Dest LC',
    shortLabel: 'DestLC',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 1, column: 3 },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
  nemoWater: {
    label: 'NeMo Water',
    shortLabel: 'NeMoWasser',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 2, column: 1 },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
  nemoDestTaqMan: {
    label: 'Dest TaqMan',
    shortLabel: 'Dest-TaqMan',
    color: LABWARE_COLOR_TAQMAN_DARK,
    gridPosition: { row: 2, column: 2 },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
  fluidX: {
    label: 'FluidX',
    shortLabel: 'FluidX',
    color: LABWARE_COLOR_FLUIDX,
    gridPosition: { row: 2, column: 3 },
    coordinateSystem: COORDINATE_SYSTEM_12X8,
  },
};

export const GRID_LAYOUT: readonly [
  readonly [GridCell, GridCell, GridCell, GridCell, GridCell],
  readonly [GridCell, GridCell, GridCell, GridCell, GridCell],
  readonly [GridCell, GridCell, GridCell, GridCell, GridCell],
] = [
  ['leftColumn', 'aPlate', 'nemoDilution', 'destPcr', 'rightColumn'],
  ['leftColumn', 'bPlate', 'nemoDestPcr2', 'destLc', 'rightColumn'],
  ['leftColumn', 'nemoWater', 'nemoDestTaqMan', 'fluidX', 'rightColumn'],
] as const;

export function isLeftColumn(key: LabwareKey) {
  return LABWARE_METADATA[key].gridPosition.column === COLUMN_LEFT_SPANNING;
}

export function isRightColumn(key: LabwareKey) {
  return LABWARE_METADATA[key].gridPosition.column === COLUMN_RIGHT_SPANNING;
}

export function getFilledLabwaresByColumn(
  labwares: TecanLabwares,
): Record<number, Array<LabwareKey>> {
  const filledByColumn: Record<number, Array<LabwareKey>> = {};

  (Object.keys(LABWARE_METADATA) as Array<LabwareKey>).forEach((key) => {
    if (labwares[key]) {
      const { column } = LABWARE_METADATA[key].gridPosition;
      if (!filledByColumn[column]) {
        filledByColumn[column] = [];
      }
      filledByColumn[column]!.push(key);
    }
  });

  return filledByColumn;
}

export function getFilledLabwaresByRow(
  labwares: TecanLabwares,
): Record<number, Array<LabwareKey>> {
  const filledByRow: Record<number, Array<LabwareKey>> = {};

  (Object.keys(LABWARE_METADATA) as Array<LabwareKey>).forEach((key) => {
    if (labwares[key]) {
      const { row } = LABWARE_METADATA[key].gridPosition;
      if (!filledByRow[row]) {
        filledByRow[row] = [];
      }
      filledByRow[row]!.push(key);
    }
  });

  return filledByRow;
}
