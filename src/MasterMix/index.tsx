import { toggleElement } from '@mll-lab/js-utils';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Card } from '../Card';
import { Table } from '../Table';
import { Typography } from '../Typography';

import { pipettingLossTableColumn } from './pipettingLossTableColumn';
import { MasterMixProps } from './types';

export {
  MasterMixProps,
  MasterMixIngredient,
  PipettingLoss,
  PipettingLossAbsolute,
  PipettingLossByFactor,
} from './types';

const TOTAL_VOLUME_ROW_CLASS = 'total-volume-row';

const MasterMixTable = styled(Table)`
  .${TOTAL_VOLUME_ROW_CLASS} {
    background-color: lightgrey;
  }
`;

/**
 * The reactants can be clicked and marked as pipetted.
 */
export function MasterMix(props: MasterMixProps) {
  const [highlightedEntries, setHighlightedEntries] = useState<Array<string>>(
    [],
  );

  const ingredientsWithSumRow = [
    ...props.ingredients,
    {
      key: 'Total Volume (non-numeric string, guaranteed to be unique since ingredients keys must be of type number)',
      title: <h4>Gesamtvolumen</h4>,
      volume: props.ingredients.reduce(
        (volumeAccumulator, ingredient) =>
          volumeAccumulator + ingredient.volume,
        0,
      ),
    },
  ];

  return (
    <Card
      title={
        <Typography.Title level={5}>{props.name} MasterMix</Typography.Title>
      }
    >
      <MasterMixTable
        style={{ maxWidth: 400 }}
        rowClassName={(record, index) => {
          if (index === props.ingredients.length) {
            return TOTAL_VOLUME_ROW_CLASS;
          }

          return highlightedEntries.includes(record.key.toString())
            ? 'mll-ant-table-row-selected'
            : '';
        }}
        dataSource={ingredientsWithSumRow}
        rowKey={(record) => record.key}
        pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
        onRow={(record, index) => ({
          onClick: () => {
            if (index === props.ingredients.length) {
              // last row with the sum should not be clickable
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
            render: (_, record) => record.title,
          },
          {
            title: '1x',
            render: (_, record) => <>{record.volume.toFixed(1)} µl</>,
          },
          pipettingLossTableColumn(props),
        ]}
      />
    </Card>
  );
}
