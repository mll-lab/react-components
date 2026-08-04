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

export type ThermoCyclerProtocolProps = {
  protocol: ThermoCyclerProtocol;
  /**
   * Where the protocol was read from, e.g. `NeMo #12`.
   * Shown to keep the view from being mistaken for the complete device program.
   */
  source: string;
};
