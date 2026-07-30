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
 * Every row is indented one step further than the total it is a summand of, so the master
 * mix and the ingredients added per reaction meet on the level of the reaction volume.
 */
function indentLevel(record: MasterMixTableRow, nested: boolean): number {
  switch (record.rowKind) {
    case 'masterMixIngredient':
      return nested ? 2 : 1;
    case 'masterMixTotal':
      return nested ? 1 : 0;
    case 'perReactionIngredient':
      return 1;
    case 'reactionTotal':
      return 0;
  }
}

export function volumeColumns(
  scaling: PipettingScaling | undefined,
  pipettedKeys: Array<string>,
  nested: boolean,
): Array<PipettingLossTableColumn> {
  return [
    {
      title: 'Name',
      render: (_: unknown, record: MasterMixTableRow) => (
        <MasterMixRowName
          level={indentLevel(record, nested)}
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
