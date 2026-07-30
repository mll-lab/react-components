import { insertIf, toggleElement } from '@mll-lab/js-utils';
import React, { useState } from 'react';

import {
  MASTER_MIX_END_ROW_CLASS,
  PIPETTED_ROW_CLASS,
  TOTAL_VOLUME_ROW_CLASS,
  UNCLICKABLE_ROW_CLASS,
  VolumeTable,
} from './VolumeTable';
import { mixRows } from './mixRows';
import { MasterMixTableRow, PipettingScaling, ReactionMix } from './types';
import { volumeColumns } from './volumeColumns';

type MixTableProps = ReactionMix & {
  scaling?: PipettingScaling;
};

function rowClassName(
  record: MasterMixTableRow,
  pipettedKeys: Array<string>,
  nested: boolean,
): string {
  switch (record.rowKind) {
    case 'masterMixIngredient':
      return pipettedKeys.includes(record.key) ? PIPETTED_ROW_CLASS : '';
    case 'masterMixTotal':
      return [
        TOTAL_VOLUME_ROW_CLASS,
        UNCLICKABLE_ROW_CLASS,
        ...insertIf(nested, MASTER_MIX_END_ROW_CLASS),
      ].join(' ');
    case 'perReactionIngredient':
      return UNCLICKABLE_ROW_CLASS;
    case 'reactionTotal':
      return [TOTAL_VOLUME_ROW_CLASS, UNCLICKABLE_ROW_CLASS].join(' ');
  }
}

/** Master mix ingredients can be clicked to mark them as pipetted. */
export function MixTable({
  ingredients,
  perReactionIngredients,
  scaling,
}: MixTableProps) {
  const [pipettedKeys, setPipettedKeys] = useState<Array<string>>([]);

  const nested = Boolean(perReactionIngredients?.length);

  return (
    <VolumeTable
      dataSource={mixRows({ ingredients, perReactionIngredients })}
      rowKey={(record: MasterMixTableRow) => record.key}
      pagination={false}
      rowClassName={(record: MasterMixTableRow) =>
        rowClassName(record, pipettedKeys, nested)
      }
      onRow={
        scaling &&
        ((record: MasterMixTableRow) => ({
          onClick: () => {
            if (record.rowKind !== 'masterMixIngredient') {
              return;
            }
            setPipettedKeys((previouslyPipetted) =>
              toggleElement(previouslyPipetted, record.key),
            );
          },
        }))
      }
      columns={volumeColumns(scaling, pipettedKeys, nested)}
    />
  );
}
