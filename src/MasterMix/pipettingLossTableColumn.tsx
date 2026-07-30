import React from 'react';

import { Tooltip } from '../Tooltip';

import {
  MasterMixTableRow,
  PipettingLoss,
  PipettingLossFactorWithMinimum,
  PipettingLossTableColumn,
  PipettingScaling,
} from './types';

type PipettingLosses = {
  factorLoss: number;
  minPositionsLoss: number;
};

function calculateAdditionalSamples(count: number, factor: number): number {
  return Math.ceil(count * factor);
}

function calculatePipettingLosses(
  count: number,
  pipettingLoss: PipettingLossFactorWithMinimum,
  volume = 1,
): PipettingLosses {
  return {
    factorLoss:
      volume * calculateAdditionalSamples(count, pipettingLoss.factor),
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

function totalVolume(record: MasterMixTableRow, args: PipettingScaling) {
  switch (args.pipettingLoss.type) {
    case 'absolute':
      return (record.volume * (args.count + args.pipettingLoss.count)).toFixed(
        1,
      );
    case 'factor':
      return (
        record.volume *
        (args.count +
          calculateAdditionalSamples(args.count, args.pipettingLoss.factor))
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
  args: PipettingScaling,
): PipettingLossTableColumn {
  return {
    align: 'right',
    title: (
      <Tooltip title="Pipettierverlust">
        {args.count}x Ansätze +{' '}
        {pipettingLossTitle(args.pipettingLoss, args.count)} (PV)
      </Tooltip>
    ),
    render: (_: unknown, record: MasterMixTableRow) => {
      switch (record.rowKind) {
        /** Pipetted into each reaction individually, so the loss does not apply. */
        case 'perReactionIngredient':
        case 'reactionTotal':
          return <>–</>;
        case 'masterMixIngredient':
        case 'masterMixTotal':
          return <>{totalVolume(record, args)} µl</>;
      }
    },
  };
}
