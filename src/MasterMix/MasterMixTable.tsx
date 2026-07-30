import { toggleElement } from '@mll-lab/js-utils';
import React, { useState } from 'react';

import { TOTAL_VOLUME_ROW_CLASS, VolumeTable } from './VolumeTable';
import { sumVolume } from './reactionVolume';
import {
  MasterMixIngredient,
  MasterMixTableRow,
  PipettingLossTableColumnArgs,
} from './types';
import { volumeColumns } from './volumeColumns';

// Non-numeric string, guaranteed to be unique since ingredient keys must be of type number.
const TOTAL_KEY = 'masterMixTotal';

export type MasterMixTableProps = PipettingLossTableColumnArgs & {
  ingredients: Array<MasterMixIngredient>;
};

/**
 * The ingredients can be clicked and marked as pipetted.
 */
export function MasterMixTable({
  ingredients,
  ...columnArgs
}: MasterMixTableProps) {
  const [highlightedEntries, setHighlightedEntries] = useState<Array<string>>(
    [],
  );

  const rows: Array<MasterMixTableRow> = [
    ...ingredients.map((ingredient) => ({
      ...ingredient,
      rowKind: 'masterMixIngredient' as const,
    })),
    {
      key: TOTAL_KEY,
      title: <h4>Gesamtvolumen</h4>,
      volume: sumVolume(ingredients),
      rowKind: 'masterMixTotal',
    },
  ];

  return (
    <VolumeTable
      rowClassName={(record: MasterMixTableRow) => {
        if (record.rowKind === 'masterMixTotal') {
          return TOTAL_VOLUME_ROW_CLASS;
        }

        return highlightedEntries.includes(record.key.toString())
          ? 'mll-ant-table-row-selected'
          : '';
      }}
      dataSource={rows}
      rowKey={(record: MasterMixTableRow) => record.key}
      pagination={false}
      onRow={(record: MasterMixTableRow) => ({
        onClick: () => {
          if (record.rowKind !== 'masterMixIngredient') {
            return;
          }
          setHighlightedEntries((previouslyHighlighted) =>
            toggleElement(previouslyHighlighted, record.key.toString()),
          );
        },
      })}
      columns={volumeColumns(columnArgs)}
    />
  );
}
