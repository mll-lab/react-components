export type ThermoCyclerProtocol = {
  name: string;
  stages: Array<ThermoCyclerStage>;
};

export type ThermoCyclerStage = {
  repeats: number;
  steps: Array<ThermoCyclerStep>;
};

export type ThermoCyclerStep = {
  temperature: number;
  hold: ThermoCyclerHold;
  rampRate?: number;
};

export type ThermoCyclerHold = { seconds: number } | { indefinite: true };
