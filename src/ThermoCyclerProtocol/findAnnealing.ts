import { minBy } from 'lodash';

import { Annealing, ThermoCyclerProtocol } from './types';

/** Lets a boundary tell "this protocol cannot be shown" apart from a rendering bug. */
export class UndisplayableProtocolError extends Error {}

/**
 * The cycled stage of a qPCR protocol holds denaturation, annealing and extension,
 * and annealing is its coolest step.
 *
 * ponytail: derived from the temperatures, since the source carries no step roles — replace with
 * explicit roles once the parser can read them. Until then it refuses every protocol it cannot
 * read unambiguously instead of guessing.
 */
export function findAnnealing({
  name,
  stages,
}: ThermoCyclerProtocol): Annealing {
  const [cycled, ...furtherCycled] = stages
    .map((stage, stageIndex) => ({ stage, stageIndex }))
    .filter(({ stage }) => stage.repeats > 1);

  if (cycled == null) {
    throw new UndisplayableProtocolError(
      `Zyklenzahl unbekannt, Protokoll wird nicht dargestellt: ${name}.`,
    );
  }

  /** Touchdown and pre-amplification cycle more than one stage; which anneals is then unknowable. */
  if (furtherCycled.length > 0) {
    throw new UndisplayableProtocolError(
      `Annealing nicht eindeutig bestimmbar, mehrere Programme mit Zyklen: ${name}.`,
    );
  }

  const coolest = minBy(
    cycled.stage.steps.map((step, stepIndex) => ({ step, stepIndex })),
    ({ step }) => step.temperature,
  );

  if (coolest == null) {
    throw new UndisplayableProtocolError(
      `Programm ohne Schritte, Protokoll wird nicht dargestellt: ${name}.`,
    );
  }

  return {
    stageIndex: cycled.stageIndex,
    stepIndex: coolest.stepIndex,
    temperature: coolest.step.temperature,
  };
}
