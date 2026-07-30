import { Modify } from '@mll-lab/js-utils';
import { ColumnType } from 'antd/es/table';
import { ReactNode } from 'react';

export type MasterMixIngredient = {
  key: number;
  title: string | NonNullable<ReactNode>;
  volume: number;
};

export type MasterMixProps = {
  name: string;
  count: number;
  ingredients: Array<MasterMixIngredient>;
  /**
   * Ingredients added to each reaction individually, e.g. template or standard.
   * They contribute to the reaction volume, but are never part of the shared master mix.
   */
  perReactionIngredients?: Array<MasterMixIngredient>;
  pipettingLoss: PipettingLoss;
};

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

export type IngredientWithStringOrNumberKey = Modify<
  MasterMixIngredient,
  {
    key: string | number;
  }
>;

export type MasterMixTableRowKind =
  | 'masterMixIngredient'
  | 'masterMixTotal'
  | 'perReactionIngredient'
  | 'reactionTotal';

export type MasterMixTableRow = IngredientWithStringOrNumberKey & {
  rowKind: MasterMixTableRowKind;
};

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
export type PipettingLossTableColumnArgs = {
  count: number;
  pipettingLoss: PipettingLoss;
};
