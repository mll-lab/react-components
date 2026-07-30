import React from 'react';

import { TOTAL_VOLUME_ROW_CLASS, VolumeTable } from './VolumeTable';
import { reactionVolume } from './reactionVolume';
import {
  MasterMixIngredient,
  MasterMixTableRow,
  PipettingLossTableColumnArgs,
} from './types';
import { volumeColumns } from './volumeColumns';

// Non-numeric string, guaranteed to be unique since ingredient keys must be of type number.
const TOTAL_KEY = 'reactionTotal';

export type ReactionTableProps = PipettingLossTableColumnArgs & {
  masterMixIngredients: Array<MasterMixIngredient>;
  perReactionIngredients: Array<MasterMixIngredient>;
};

/**
 * Continues the master mix table with what is added to each reaction individually.
 * Those ingredients are pipetted per well, so the pipetting loss does not apply to them.
 */
export function ReactionTable({
  masterMixIngredients,
  perReactionIngredients,
  ...columnArgs
}: ReactionTableProps) {
  const rows: Array<MasterMixTableRow> = [
    ...perReactionIngredients.map((ingredient) => ({
      ...ingredient,
      rowKind: 'perReactionIngredient' as const,
    })),
    {
      key: TOTAL_KEY,
      title: <h4>Reaktionsvolumen</h4>,
      volume: reactionVolume({
        ingredients: masterMixIngredients,
        perReactionIngredients,
      }),
      rowKind: 'reactionTotal',
    },
  ];

  return (
    <VolumeTable
      showHeader={false}
      rowClassName={(record: MasterMixTableRow) =>
        record.rowKind === 'reactionTotal' ? TOTAL_VOLUME_ROW_CLASS : ''
      }
      dataSource={rows}
      rowKey={(record: MasterMixTableRow) => record.key}
      pagination={false}
      columns={volumeColumns(columnArgs)}
    />
  );
}
