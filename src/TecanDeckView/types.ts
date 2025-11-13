import * as React from 'react';

export type Labware = {
  content: React.ReactElement;
};

export type TecanLabwares = {
  mmPlate?: Labware;
  destPcr?: Labware;
  aPlate?: Labware;
  bPlate?: Labware;
  nemoWater?: Labware;
  nemoDilution?: Labware;
  nemoDestPcr2?: Labware;
  nemoDestTaqMan?: Labware;
  destLc?: Labware;
  fluidX?: Labware;
  destPcr1?: Labware;
  destPcr2?: Labware;
};

export type LabwareKey = keyof TecanLabwares;

export type LabwareConfig = {
  key: LabwareKey;
  label: string;
  shortLabel: string;
  content?: React.ReactElement;
  color: string;
};

export type GridPosition = {
  row: 0 | 1 | 2;
  column: 0 | 1 | 2 | 3 | 4;
  alignment: 'start' | 'center' | 'end';
};

export type GridCell = LabwareKey | 'leftColumn' | 'rightColumn';

export type LabwareWithStyle = LabwareConfig & {
  style: React.CSSProperties;
};
