export type ThermoCyclerProtocol = {
  name: string;
  stages: Array<Stage>;
};

export type Stage = {
  repeats: number;
  steps: Array<Step>;
};

export type Step = {
  temperature: number;
  hold: Hold;
  rampRate?: number;
};

export type Hold = { seconds: number } | { indefinite: true };

export type ThermoCyclerProtocolProps = {
  protocol: ThermoCyclerProtocol;
  /**
   * Where the protocol was read from, e.g. `NeMo #12`.
   * Shown to keep the view from being mistaken for the complete device program.
   */
  source: string;
};
