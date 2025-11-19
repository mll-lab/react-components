import * as React from 'react';

import type { CoordinateSystem, PlateWell } from '../Plate';

export type Labware =
  | {
      type: 'custom';
      content: React.ReactElement;
    }
  | {
      type: 'plate';
      data: Array<PlateWell<CoordinateSystem>>;
      loading?: boolean;
      wellSizing?: 'uniform' | 'compact';
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
  labware?: Labware;
  color: string;
  coordinateSystem: CoordinateSystem;
};

export type GridPosition = {
  row: 0 | 1 | 2;
  column: 0 | 1 | 2 | 3 | 4;
};

export type GridCell = LabwareKey | 'leftColumn' | 'rightColumn';

export type LabwareWithStyle = LabwareConfig & {
  style: React.CSSProperties;
};
