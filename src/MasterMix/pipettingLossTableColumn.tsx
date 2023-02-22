import React from 'react';

import { Tooltip } from '../Tooltip';

import {
  IngredientWithStringOrNumberKey,
  PipettingLoss,
  PipettingLossTableColumn,
  PipettingLossTableColumnArgs,
} from './types';

function pipettingLossTitle(pipettingLoss: PipettingLoss): string {
  switch (pipettingLoss.type) {
    case 'absolute':
      return `${pipettingLoss.count}x`;
    case 'factor':
      return `${pipettingLoss.factor * 100}%`;
  }
}

function totalVolume(
  record: IngredientWithStringOrNumberKey,
  args: PipettingLossTableColumnArgs,
) {
  switch (args.pipettingLoss.type) {
    case 'absolute':
      return (record.volume * (args.count + args.pipettingLoss.count)).toFixed(
        1,
      );
    case 'factor':
      return (
        record.volume * args.count +
        record.volume * args.count * args.pipettingLoss.factor
      ).toFixed(1);
  }
}

export function pipettingLossTableColumn(
  args: PipettingLossTableColumnArgs,
): PipettingLossTableColumn {
  return {
    title: (
      <Tooltip title="Pipettierverlust">
        {args.count}x Ansätze + {pipettingLossTitle(args.pipettingLoss)} (PV)
      </Tooltip>
    ),
    render: (_: unknown, record: IngredientWithStringOrNumberKey) => (
      <>{totalVolume(record, args)} µl</>
    ),
  };
}
