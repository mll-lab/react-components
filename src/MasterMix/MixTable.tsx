import { toggleElement } from '@mll-lab/js-utils';
import React, { useState } from 'react';

import {
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
): string {
  switch (record.rowKind) {
    case 'masterMixIngredient':
      return pipettedKeys.includes(record.key) ? PIPETTED_ROW_CLASS : '';
    case 'masterMixTotal':
    case 'reactionTotal':
      return TOTAL_VOLUME_ROW_CLASS;
    case 'perReactionIngredient':
      return '';
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
        rowClassName(record, pipettedKeys)
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
