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

/**
 * Within a reaction mix the total names the master mix, so it stays on the level of the
 * other per reaction rows. On its own there is no such level to stand out from, and
 * outdenting it would leave the ingredients indented against nothing.
 */
function isIndented(record: MasterMixTableRow, nested: boolean): boolean {
  return (
    record.rowKind === 'masterMixIngredient' ||
    (!nested && record.rowKind === 'masterMixTotal')
  );
}

export function volumeColumns(
  scaling: PipettingScaling | undefined,
  pipettedKeys: Array<string>,
  nested: boolean,
): Array<PipettingLossTableColumn> {
  return [
    {
      title: 'Name',
      render: (_: unknown, record: MasterMixTableRow) =>
        isIndented(record, nested) ? (
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
