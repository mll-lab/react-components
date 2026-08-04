import { AnnealingPosition } from './protocolSummary';
import { ThermoCyclerStep, ThermoCyclerProtocol } from './types';

export type StepRow = ThermoCyclerStep & {
  key: string;
  isAnnealing: boolean;
};

export type StageRow = {
  key: string;
  stageIndex: number;
  repeats: number;
  steps: Array<StepRow>;
};

export function stepTemperatures(stages: Array<StageRow>): Array<number> {
  return stages.reduce<Array<number>>(
    (temperatures, stage) => [
      ...temperatures,
      ...stage.steps.map((step) => step.temperature),
    ],
    [],
  );
}

/** Neither stages nor steps carry an ID, so their position in the protocol identifies them. */
export function stageRows(
  { stages }: ThermoCyclerProtocol,
  annealing: AnnealingPosition,
): Array<StageRow> {
  return stages.map((stage, stageIndex) => ({
    key: `stage-${stageIndex}`,
    stageIndex,
    repeats: stage.repeats,
    steps: stage.steps.map((step, stepIndex) => ({
      ...step,
      key: `stage-${stageIndex}-step-${stepIndex}`,
      isAnnealing:
        stageIndex === annealing.stageIndex &&
        stepIndex === annealing.stepIndex,
    })),
  }));
}
