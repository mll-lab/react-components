import React from 'react';

import { MasterMixIngredientName } from './MasterMixIngredientName';
import { REFERENCE_VOLUME_CLASS } from './VolumeTable';
import { pipettingLossTableColumn } from './pipettingLossTableColumn';
import {
  MasterMixTableRow,
  PipettingLossTableColumn,
  PipettingScaling,
} from './types';

/** Only the master mix is scaled, so all other volumes are shown for a single reaction only. */
function isScaled(record: MasterMixTableRow): boolean {
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
        record.rowKind === 'masterMixIngredient' ? (
          <MasterMixIngredientName pipetted={pipettedKeys.includes(record.key)}>
            {record.title}
          </MasterMixIngredientName>
        ) : (
          record.title
        ),
    },
    {
      title: scaling ? '1x' : 'Volumen',
      align: 'right',
      onCell: (record: MasterMixTableRow) => ({
        className:
          scaling && isScaled(record) ? REFERENCE_VOLUME_CLASS : undefined,
      }),
      render: (_: unknown, record: MasterMixTableRow) =>
        record.rowKind === 'masterMixSection' ? null : (
          <>{record.volume.toFixed(1)} µl</>
        ),
    },
    ...(scaling ? [pipettingLossTableColumn(scaling)] : []),
  ];
}
