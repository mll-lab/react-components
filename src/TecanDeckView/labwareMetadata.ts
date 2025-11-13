import { GridCell, GridPosition, LabwareKey } from './types';

// Column constants
export const COLUMN_LEFT_SPANNING = 0; // Left column that spans all three rows (mmPlate)
export const COLUMN_RIGHT_SPANNING = 4; // Right column that spans all three rows (destPcr1, destPcr2)

type LabwareMetadata = {
  label: string;
  shortLabel: string;
  color: string;
  gridPosition: GridPosition;
};

/* eslint-disable @mll-lab/no-color-literals -- Hardware-specific colors must match physical Tecan deck appearance */
const LABWARE_COLOR_MM_PLATE = '#72be98'; // Green for MasterMix plate
const LABWARE_COLOR_STANDARD_PLATE = '#5598be'; // Blue for standard plates
const LABWARE_COLOR_TAQMAN_DARK = '#4a4a4a'; // Dark gray for TaqMan
const LABWARE_COLOR_FLUIDX = '#b3b3b3'; // Light gray for FluidX
/* eslint-enable @mll-lab/no-color-literals */

export const LABWARE_METADATA: Record<LabwareKey, LabwareMetadata> = {
  mmPlate: {
    label: 'MM Plate',
    shortLabel: 'MM',
    color: LABWARE_COLOR_MM_PLATE,
    gridPosition: { row: 0, column: 0, alignment: 'center' },
  },
  aPlate: {
    label: 'A Plate (200µl #1)',
    shortLabel: 'A',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: 1, alignment: 'start' },
  },
  nemoDilution: {
    label: 'NeMo Dilution',
    shortLabel: 'NeMoDilution',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: 2, alignment: 'start' },
  },
  destPcr: {
    label: 'Dest PCR',
    shortLabel: 'DestPCR',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: 3, alignment: 'start' },
  },
  destPcr1: {
    label: 'Dest PCR 1',
    shortLabel: 'DestPCR1',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: COLUMN_RIGHT_SPANNING, alignment: 'start' },
  },
  destPcr2: {
    label: 'Dest PCR 2',
    shortLabel: 'DestPCR2',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 0, column: COLUMN_RIGHT_SPANNING, alignment: 'start' },
  },
  bPlate: {
    label: 'B Plate (200µl #2)',
    shortLabel: 'B',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 1, column: 1, alignment: 'center' },
  },
  nemoDestPcr2: {
    label: 'NeMo Dest PCR 2',
    shortLabel: 'DestPCR2',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 1, column: 2, alignment: 'center' },
  },
  destLc: {
    label: 'Dest LC',
    shortLabel: 'DestLC',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 1, column: 3, alignment: 'center' },
  },
  nemoWater: {
    label: 'NeMo Water',
    shortLabel: 'NeMoWasser',
    color: LABWARE_COLOR_STANDARD_PLATE,
    gridPosition: { row: 2, column: 1, alignment: 'end' },
  },
  nemoDestTaqMan: {
    label: 'Dest TaqMan',
    shortLabel: 'Dest-TaqMan',
    color: LABWARE_COLOR_TAQMAN_DARK,
    gridPosition: { row: 2, column: 2, alignment: 'end' },
  },
  fluidX: {
    label: 'FluidX',
    shortLabel: 'FluidX',
    color: LABWARE_COLOR_FLUIDX,
    gridPosition: { row: 2, column: 3, alignment: 'end' },
  },
};

// Grid layout: 5 columns (leftColumn | 3x3 grid | rightColumn), 3 rows
// Type-safe grid structure with special strings for spanning columns
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
