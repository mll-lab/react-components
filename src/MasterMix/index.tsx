import React, { ReactNode, useState } from 'react';

import { Card } from '../Card';
import { Table } from '../Table';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

const PIPETTING_LOSS_FACTOR = 2;
const SUM_ROW_KEY = 99999;

export type MasterMixParams = {
  name: string;
  count: number;
  ingredients: Array<{
    key: number;
    title: string | NonNullable<ReactNode>;
    volume: number;
  }>;
};

/**
 * The reactants can be clicked and marked as pipetted.
 *
 * Do not use the 'key' 99999. This key is reserved for as SUM_ROW_KEY
 */
export function MasterMix(props: MasterMixParams) {
  const [highlightedEntries, setHighlightedEntries] = useState<Array<number>>(
    [],
  );

  const ingredientsWithSumRow = [
    ...props.ingredients,
    {
      key: SUM_ROW_KEY,
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
      <Table
        style={{ maxWidth: 400 }}
        rowClassName={(record) =>
          highlightedEntries.includes(record.key)
            ? 'mll-ant-table-row-selected'
            : ''
        }
        dataSource={ingredientsWithSumRow}
        rowKey={(record) => record.key}
        pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
        onRow={(record, index) => ({
          onClick: () => {
            if (index === props.ingredients.length) {
              // last row with the sum should not be clickable
              return;
            }

            setHighlightedEntries(
              (prevState) =>
                prevState.includes(record.key)
                  ? prevState.filter((i) => i !== record.key) // delete key
                  : [...prevState, record.key], // add key
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
          {
            title: (
              <Tooltip title="Pipettierverlust">
                <span>
                  {props.count}x Ansätze + {PIPETTING_LOSS_FACTOR}x (PV)
                </span>
              </Tooltip>
            ),
            render: (_, record) => (
              <>
                {(
                  record.volume *
                  (props.count + PIPETTING_LOSS_FACTOR)
                ).toFixed(1)}{' '}
                µl
              </>
            ),
          },
        ]}
      />
    </Card>
  );
}
