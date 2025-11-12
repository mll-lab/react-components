import { LabwareKey } from './types';

type LabwareMetadata = {
  label: string;
  shortLabel: string;
  color: string;
};

/* eslint-disable @mll-lab/no-color-literals */
export const LABWARE_METADATA: Record<LabwareKey, LabwareMetadata> = {
  mmPlate: {
    label: 'MM Plate',
    shortLabel: 'MM',
    color: '#72be98',
  },
  destPcr: {
    label: 'Dest PCR',
    shortLabel: 'DestPCR',
    color: '#5598be',
  },
  aPlate: {
    label: 'A Plate (200µl #1)',
    shortLabel: 'A',
    color: '#5598be',
  },
  bPlate: {
    label: 'B Plate (200µl #2)',
    shortLabel: 'B',
    color: '#5598be',
  },
  nemoWater: {
    label: 'NeMo Water',
    shortLabel: 'NeMoWasser',
    color: '#5598be',
  },
  nemoDilution: {
    label: 'NeMo Dilution',
    shortLabel: 'NeMoDilution',
    color: '#5598be',
  },
  nemoDestPcr2: {
    label: 'NeMo Dest PCR 2',
    shortLabel: 'DestPCR2',
    color: '#5598be',
  },
  nemoDestTaqMan: {
    label: 'Dest TaqMan',
    shortLabel: 'Dest-TaqMan',
    color: '#4a4a4a',
  },
  destLc: {
    label: 'Dest LC',
    shortLabel: 'DestLC',
    color: '#5598be',
  },
  fluidX: {
    label: 'FluidX',
    shortLabel: 'FluidX',
    color: '#b3b3b3',
  },
  destPcr1: {
    label: 'Dest PCR 1',
    shortLabel: 'DestPCR1',
    color: '#5598be',
  },
  destPcr2: {
    label: 'Dest PCR 2',
    shortLabel: 'DestPCR2',
    color: '#5598be',
  },
};
/* eslint-enable @mll-lab/no-color-literals */
