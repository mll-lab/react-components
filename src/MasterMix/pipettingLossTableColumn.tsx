import React from 'react';

import { Tooltip } from '../Tooltip';

import {
  IngredientWithStringOrNumberKey,
  PipettingLoss,
  PipettingLossFactorWithMinimum,
  PipettingLossTableColumn,
  PipettingLossTableColumnArgs,
} from './types';

type PipettingLosses = {
  factorLoss: number;
  minPositionsLoss: number;
};

function calculatePipettingLosses(
  count: number,
  pipettingLoss: PipettingLossFactorWithMinimum,
  volume = 1,
): PipettingLosses {
  return {
    factorLoss: volume * Math.ceil(count * pipettingLoss.factor),
    minPositionsLoss: volume * pipettingLoss.minPositions,
  };
}

function pipettingLossTitle(
  pipettingLoss: PipettingLoss,
  count: number,
): string {
  switch (pipettingLoss.type) {
    case 'absolute':
      return `${pipettingLoss.count}x`;
    case 'factor':
      return `${pipettingLoss.factor * 100}%`;
    case 'factorWithMinimum': {
      const { factorLoss, minPositionsLoss } = calculatePipettingLosses(
        count,
        pipettingLoss,
      );
      return factorLoss > minPositionsLoss
        ? `${(pipettingLoss.factor * 100).toFixed(0)}%`
        : `${pipettingLoss.minPositions}x`;
    }
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
        record.volume *
        (args.count + Math.ceil(args.count * args.pipettingLoss.factor))
      ).toFixed(1);
    case 'factorWithMinimum': {
      const baseVolume = record.volume * args.count;
      const { factorLoss, minPositionsLoss } = calculatePipettingLosses(
        args.count,
        args.pipettingLoss,
        record.volume,
      );
      const pipettingLoss = Math.max(factorLoss, minPositionsLoss);
      return (baseVolume + pipettingLoss).toFixed(1);
    }
  }
}

export function pipettingLossTableColumn(
  args: PipettingLossTableColumnArgs,
): PipettingLossTableColumn {
  return {
    title: (
      <Tooltip title="Pipettierverlust">
        {args.count}x Ansätze +{' '}
        {pipettingLossTitle(args.pipettingLoss, args.count)} (PV)
      </Tooltip>
    ),
    render: (_: unknown, record: IngredientWithStringOrNumberKey) => (
      <>{totalVolume(record, args)} µl</>
    ),
  };
}
