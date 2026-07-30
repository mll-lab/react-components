import { Modify } from '@mll-lab/js-utils';
import { ColumnType } from 'antd/es/table';
import { ReactNode } from 'react';

export type MasterMixIngredient = {
  key: number;
  title: string | NonNullable<ReactNode>;
  volume: number;
};

export type ReactionMix = {
  ingredients: Array<MasterMixIngredient>;
  /**
   * Ingredients added to each reaction individually, e.g. template or standard.
   * They contribute to the reaction volume, but are never part of the shared master mix.
   */
  perReactionIngredients?: Array<MasterMixIngredient>;
};

/** Scales the mix to a concrete run, e.g. a work list for a plate with 20 wells. */
export type PipettingScaling = {
  mode?: never;
  count: number;
  pipettingLoss: PipettingLoss;
};

/** Shows the mix without scaling it, for contexts where no run exists yet. */
export type RecipeMode = {
  mode: 'recipe';
  count?: never;
  pipettingLoss?: never;
};

export type MasterMixProps = {
  name: string;
} & ReactionMix &
  (PipettingScaling | RecipeMode);

export type PipettingLossAbsolute = { type: 'absolute'; count: number };
export type PipettingLossByFactor = { type: 'factor'; factor: number };
export type PipettingLossFactorWithMinimum = {
  type: 'factorWithMinimum';
  factor: number;
  minPositions: number;
};
export type PipettingLoss =
  | PipettingLossByFactor
  | PipettingLossAbsolute
  | PipettingLossFactorWithMinimum;

/** Keyed by string, since the rows the table adds around the ingredients have no numeric key. */
type MixTableRow = {
  key: string;
  title: MasterMixIngredient['title'];
};

export type MasterMixTableRow =
  | (MixTableRow & {
      volume: number;
      rowKind:
        | 'masterMixIngredient'
        | 'masterMixTotal'
        | 'perReactionIngredient'
        | 'reactionTotal';
    })
  /** Labels the master mix within the reaction mix, so it carries no volume of its own. */
  | (MixTableRow & { rowKind: 'masterMixSection' });

export type PipettingLossTableColumn = Modify<
  ColumnType<MasterMixTableRow>,
  {
    render: (
      value: unknown,
      record: MasterMixTableRow,
      index: number,
    ) => React.ReactNode;
  }
>;
