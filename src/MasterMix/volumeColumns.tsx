import React from 'react';

import { MasterMixRowName } from './MasterMixRowName';
import { REFERENCE_VOLUME_CLASS } from './VolumeTable';
import { indentLevel } from './indentLevel';
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
  withinReactionMix: boolean,
): Array<PipettingLossTableColumn> {
  return [
    {
      title: 'Name',
      render: (_: unknown, record: MasterMixTableRow) => (
        <MasterMixRowName
          level={indentLevel(record, withinReactionMix)}
          pipetted={pipettedKeys.includes(record.key)}
        >
          {record.title}
        </MasterMixRowName>
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
