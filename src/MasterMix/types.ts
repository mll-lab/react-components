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
  pipettingLoss: PipettingLoss;
};
export type PipettingLossByFactor = { type: 'factor'; factor: number };
export type PipettingLossAbsolute = { type: 'absolute'; count: number };
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

export type PipettingLossTableColumn = Modify<
  ColumnType<IngredientWithStringOrNumberKey>,
  {
    render: (
      value: unknown,
      record: IngredientWithStringOrNumberKey,
      index: number,
    ) => React.ReactNode;
  }
>;
export type PipettingLossTableColumnArgs = {
  count: number;
  pipettingLoss: PipettingLoss;
};
