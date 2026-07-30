import { toggleElement } from '@mll-lab/js-utils';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Card } from '../Card';
import { Table } from '../Table';
import { Typography } from '../Typography';

import { pipettingLossTableColumn } from './pipettingLossTableColumn';
import {
  MasterMixIngredient,
  MasterMixProps,
  MasterMixTableRow,
} from './types';

export {
  MasterMixProps,
  MasterMixIngredient,
  PipettingLoss,
  PipettingLossAbsolute,
  PipettingLossByFactor,
  PipettingLossFactorWithMinimum,
} from './types';

const TOTAL_VOLUME_ROW_CLASS = 'total-volume-row';

// Non-numeric strings, guaranteed to be unique since ingredient keys must be of type number.
const MASTER_MIX_TOTAL_KEY = 'masterMixTotal';
const REACTION_TOTAL_KEY = 'reactionTotal';

const MasterMixTable = styled(Table)`
  .${TOTAL_VOLUME_ROW_CLASS} {
    background-color: lightgrey;
  }
`;

function sumVolume(ingredients: Array<MasterMixIngredient>): number {
  return ingredients.reduce(
    (volumeAccumulator, ingredient) => volumeAccumulator + ingredient.volume,
    0,
  );
}

/**
 * Volume of a single reaction: the master mix plus everything added per reaction.
 * Concentrations of the ingredients are relative to this volume.
 */
export function reactionVolume(
  mix: Pick<MasterMixProps, 'ingredients' | 'perReactionIngredients'>,
): number {
  return sumVolume([...mix.ingredients, ...(mix.perReactionIngredients ?? [])]);
}

/**
 * The reactants can be clicked and marked as pipetted.
 */
export function MasterMix(props: MasterMixProps) {
  const [highlightedEntries, setHighlightedEntries] = useState<Array<string>>(
    [],
  );

  const perReactionIngredients = props.perReactionIngredients ?? [];
  const masterMixVolume = sumVolume(props.ingredients);

  const reactionTotalRow: Array<MasterMixTableRow> =
    perReactionIngredients.length > 0
      ? [
          {
            key: REACTION_TOTAL_KEY,
            title: <h4>Reaktionsvolumen</h4>,
            volume: masterMixVolume + sumVolume(perReactionIngredients),
            rowKind: 'reactionTotal',
          },
        ]
      : [];

  const rows: Array<MasterMixTableRow> = [
    ...props.ingredients.map((ingredient) => ({
      ...ingredient,
      rowKind: 'masterMixIngredient' as const,
    })),
    {
      key: MASTER_MIX_TOTAL_KEY,
      title: <h4>Gesamtvolumen</h4>,
      volume: masterMixVolume,
      rowKind: 'masterMixTotal',
    },
    ...perReactionIngredients.map((ingredient) => ({
      ...ingredient,
      rowKind: 'perReactionIngredient' as const,
    })),
    ...reactionTotalRow,
  ];

  return (
    <Card
      title={
        <Typography.Title level={5}>{props.name} MasterMix</Typography.Title>
      }
    >
      <MasterMixTable
        style={{ maxWidth: 400 }}
        rowClassName={(record: MasterMixTableRow) => {
          if (
            record.rowKind === 'masterMixTotal' ||
            record.rowKind === 'reactionTotal'
          ) {
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
            setHighlightedEntries((prevIDs) =>
              toggleElement(prevIDs, record.key.toString()),
            );
          },
        })}
        columns={[
          {
            title: 'Name',
            render: (_: unknown, record: MasterMixTableRow) => record.title,
          },
          {
            title: '1x',
            render: (_: unknown, record: MasterMixTableRow) => (
              <>{record.volume.toFixed(1)} µl</>
            ),
          },
          pipettingLossTableColumn(props),
        ]}
      />
    </Card>
  );
}
