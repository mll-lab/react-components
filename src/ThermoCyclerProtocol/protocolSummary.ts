import { maxBy, minBy } from 'lodash';

import { ThermoCyclerStep, ThermoCyclerProtocol } from './types';

/**
 * Lets a boundary tell "this protocol cannot be shown" apart from a rendering bug,
 * so the operator sees a stated reason instead of an empty view.
 */
export class UndisplayableProtocolError extends Error {}

export type AnnealingPosition = {
  stageIndex: number;
  stepIndex: number;
};

export type ProtocolSummary = {
  cycles: number;
  annealingStep: ThermoCyclerStep;
  /**
   * The hottest step of the cycled stage. Annealing alone does not tell two protocols apart:
   * the denaturation pair is what a reader checks the protocol against.
   */
  denaturationStep: ThermoCyclerStep;
  /**
   * Where the annealing step sits. Views mark it by position rather than by object identity,
   * because any copy of the protocol on its way into the component would drop the marking
   * without any error.
   */
  annealingPosition: AnnealingPosition;
};

/**
 * The values both views lead with, so nobody has to read the table for them:
 * 58 against 60 °C annealing is the clinically relevant mix-up.
 *
 * The cycled stage of a qPCR protocol holds denaturation, annealing and extension,
 * and annealing is its coolest step.
 * ponytail: derived from the temperatures, since the source carries no step roles —
 * replace with explicit roles once the parser can read them. Until then the derivation
 * refuses every protocol it cannot read unambiguously, and the label says "abgeleitet".
 */
export function protocolSummary({
  name,
  stages,
}: ThermoCyclerProtocol): ProtocolSummary {
  const [cycled, ...furtherCycled] = stages
    .map((stage, stageIndex) => ({ stage, stageIndex }))
    .filter(({ stage }) => stage.repeats > 1);

  if (cycled == null) {
    throw new UndisplayableProtocolError(
      `Zyklenzahl unbekannt, Protokoll wird nicht dargestellt: ${name}.`,
    );
  }

  /**
   * Touchdown and pre-amplification protocols cycle more than one stage. Which of them anneals
   * cannot be told from temperatures alone, and a guess would be shown as a plain fact.
   */
  if (furtherCycled.length > 0) {
    throw new UndisplayableProtocolError(
      `Annealing nicht eindeutig bestimmbar, mehrere Programme mit Zyklen: ${name}.`,
    );
  }

  const annealing = minBy(
    cycled.stage.steps.map((step, stepIndex) => ({ step, stepIndex })),
    ({ step }) => step.temperature,
  );

  const denaturationStep = maxBy(
    cycled.stage.steps,
    (step) => step.temperature,
  );

  if (annealing == null || denaturationStep == null) {
    throw new UndisplayableProtocolError(
      `Programm ohne Schritte, Protokoll wird nicht dargestellt: ${name}.`,
    );
  }

  return {
    cycles: cycled.stage.repeats,
    annealingStep: annealing.step,
    denaturationStep,
    annealingPosition: {
      stageIndex: cycled.stageIndex,
      stepIndex: annealing.stepIndex,
    },
  };
}
