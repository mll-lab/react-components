import React from 'react';

import { MasterMixRowName } from './MasterMixRowName';
import { REFERENCE_VOLUME_CLASS } from './VolumeTable';
import { pipettingLossTableColumn } from './pipettingLossTableColumn';
import {
  MasterMixTableRow,
  PipettingLossTableColumn,
  PipettingScaling,
} from './types';

/** Only the master mix is mixed for all reactions at once, so only it is scaled. */
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
      /** Indented as parts of the total below them, which stays flush as their sum. */
      render: (_: unknown, record: MasterMixTableRow) =>
        record.rowKind === 'masterMixIngredient' ? (
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
      render: (_: unknown, record: MasterMixTableRow) => (
        <>{record.volume.toFixed(1)} µl</>
      ),
    },
    ...(scaling ? [pipettingLossTableColumn(scaling)] : []),
  ];
}
