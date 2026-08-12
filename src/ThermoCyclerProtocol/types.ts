import { Maybe } from '@mll-lab/js-utils';

export type ThermoCyclerProtocol = {
  name: string;
  stages: Array<ThermoCyclerStage>;
};

export type ThermoCyclerStage = {
  /** A loop whose cycle count the source never carried, which is not the same as running once. */
  repeats: Maybe<number>;
  steps: Array<ThermoCyclerStep>;
};

export type ThermoCyclerStep = {
  temperature: number;
  hold: ThermoCyclerHold;
  rampRate?: number;
};

export type ThermoCyclerHold = { seconds: number } | { indefinite: true };
