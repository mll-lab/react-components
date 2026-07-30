import { insertIf, toggleElement } from '@mll-lab/js-utils';
import React, { useState } from 'react';

import {
  MASTER_MIX_END_ROW_CLASS,
  PIPETTED_ROW_CLASS,
  TOTAL_VOLUME_ROW_CLASS,
  VolumeTable,
} from './VolumeTable';
import { hasPerReactionIngredients } from './hasPerReactionIngredients';
import { mixRows } from './mixRows';
import { MasterMixTableRow, PipettingScaling, ReactionMix } from './types';
import { volumeColumns } from './volumeColumns';

type MixTableProps = ReactionMix & {
  scaling?: PipettingScaling;
};

function rowClassName(
  record: MasterMixTableRow,
  pipettedKeys: Array<string>,
  withinReactionMix: boolean,
): string {
  switch (record.rowKind) {
    case 'masterMixIngredient':
      return pipettedKeys.includes(record.key) ? PIPETTED_ROW_CLASS : '';
    case 'masterMixTotal':
      return [
        TOTAL_VOLUME_ROW_CLASS,
        ...insertIf(withinReactionMix, MASTER_MIX_END_ROW_CLASS),
      ].join(' ');
    case 'perReactionIngredient':
      return '';
    case 'reactionTotal':
      return TOTAL_VOLUME_ROW_CLASS;
  }
}

/** Master mix ingredients can be clicked to mark them as pipetted. */
export function MixTable({
  ingredients,
  perReactionIngredients,
  scaling,
}: MixTableProps) {
  const [pipettedKeys, setPipettedKeys] = useState<Array<string>>([]);

  const withinReactionMix = hasPerReactionIngredients(perReactionIngredients);

  return (
    <VolumeTable
      dataSource={mixRows({ ingredients, perReactionIngredients })}
      rowKey={(record: MasterMixTableRow) => record.key}
      pagination={false}
      rowClassName={(record: MasterMixTableRow) =>
        rowClassName(record, pipettedKeys, withinReactionMix)
      }
      onRow={
        scaling &&
        ((record: MasterMixTableRow) =>
          record.rowKind === 'masterMixIngredient'
            ? {
                onClick: () =>
                  setPipettedKeys((previouslyPipetted) =>
                    toggleElement(previouslyPipetted, record.key),
                  ),
              }
            : {})
      }
      columns={volumeColumns(scaling, pipettedKeys, withinReactionMix)}
    />
  );
}
