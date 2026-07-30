import React from 'react';

import { MasterMixRowName } from './MasterMixRowName';
import { REFERENCE_VOLUME_CLASS } from './VolumeTable';
import { pipettingLossTableColumn } from './pipettingLossTableColumn';
import {
  MasterMixTableRow,
  PipettingLossTableColumn,
  PipettingScaling,
} from './types';

/**
 * The rows the master mix is made of, which are indented into it and are the only ones
 * scaled by the number of reactions.
 */
function belongsToMasterMix(record: MasterMixTableRow): boolean {
  return (
    record.rowKind === 'masterMixIngredient' ||
    record.rowKind === 'masterMixTotal'
  );
}

export function volumeColumns(
  scaling: PipettingScaling | undefined,
  pipettedKeys: Array<string>,
): Array<PipettingLossTableColumn> {
  return [
    {
      title: 'Name',
      render: (_: unknown, record: MasterMixTableRow) =>
        belongsToMasterMix(record) ? (
          <MasterMixRowName pipetted={pipettedKeys.includes(record.key)}>
            {record.title}
          </MasterMixRowName>
        ) : (
          record.title
        ),
    },
    {
      title: scaling ? '1x' : 'Volumen',
      align: 'right',
      onCell: (record: MasterMixTableRow) => ({
        className:
          scaling && belongsToMasterMix(record)
            ? REFERENCE_VOLUME_CLASS
            : undefined,
      }),
      render: (_: unknown, record: MasterMixTableRow) =>
        record.rowKind === 'masterMixSection' ? null : (
          <>{record.volume.toFixed(1)} µl</>
        ),
    },
    ...(scaling ? [pipettingLossTableColumn(scaling)] : []),
  ];
}
