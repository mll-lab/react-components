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

/** Located by position, not by object identity — a copy of the protocol would drop that silently. */
export type Annealing = {
  stageIndex: number;
  stepIndex: number;
  temperature: ThermoCyclerStep['temperature'];
};

export type ThermoCyclerProtocolProps = {
  protocol: ThermoCyclerProtocol;
  /**
   * Which step anneals is derived, not stored, so the caller states it rather than the view
   * guessing it. `findAnnealing` derives it for protocols of the LightCycler 480 software.
   */
  annealing: Annealing;
};
