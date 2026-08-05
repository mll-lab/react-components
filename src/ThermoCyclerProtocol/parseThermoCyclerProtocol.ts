import { Maybe } from '@mll-lab/js-utils';

import { UndisplayableThermoCyclerProtocolError } from './UndisplayableThermoCyclerProtocolError';
import {
  ThermoCyclerHold,
  ThermoCyclerStage,
  ThermoCyclerStep,
  ThermoCyclerProtocol,
} from './types';
import { SECONDS_PER_MINUTE } from './units';

/** One step as stored in the protocol column. */
type RawStep = {
  Tp: number;
  t: string;
  loop: string;
};

type LoopBoundary = 'opens' | 'closes';

type ParsedLoop = {
  boundary?: LoopBoundary;
  repeats?: number;
  rampRate?: number;
};

const INDEFINITE_HOLD = 'Cool';
const HOLD_PATTERN = /^(\d+) (sec|min)$/;

const LOOP_OPENS = '\\ ';
const LOOP_CLOSES = '/ ';
const REPEATS_PATTERN = /^&nbsp;(\d+)x /;
const RAMP_RATE_PATTERN = /^Ramp Rate (\d+(?:\.\d+)?)$/;

export function parseThermoCyclerProtocol({
  name,
  protocol,
}: {
  name: ThermoCyclerProtocol['name'];
  protocol: string;
}): ThermoCyclerProtocol {
  return { name, stages: parseStages(parseRawSteps(protocol)) };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value != null;
}

function parseRawSteps(protocol: string): Array<RawStep> {
  const parsed: unknown = JSON.parse(protocol);
  if (!isRecord(parsed)) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Protokoll ist kein Objekt: ${protocol}.`,
    );
  }

  /** The keys are array indices, so they enumerate in the order the steps run. */
  return Object.keys(parsed).map((index) => parseRawStep(parsed[index], index));
}

function parseRawStep(step: unknown, index: string): RawStep {
  if (
    !isRecord(step) ||
    typeof step.Tp !== 'number' ||
    typeof step.t !== 'string' ||
    typeof step.loop !== 'string'
  ) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Schritt ${index} ist kein Protokollschritt: ${JSON.stringify(step)}.`,
    );
  }

  return { Tp: step.Tp, t: step.t, loop: step.loop };
}

type CollectedStages = {
  stages: Array<ThermoCyclerStage>;
  openLoop: Maybe<Array<RawStep>>;
};

const NOTHING_COLLECTED: CollectedStages = { stages: [], openLoop: null };

function parseStages(rawSteps: Array<RawStep>): Array<ThermoCyclerStage> {
  const { stages, openLoop } = rawSteps.reduce(collectStage, NOTHING_COLLECTED);

  if (openLoop) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Loop wird nicht geschlossen: ${loopDescription(openLoop)}.`,
    );
  }

  return stages;
}

function collectStage(
  { stages, openLoop }: CollectedStages,
  rawStep: RawStep,
): CollectedStages {
  const { boundary, repeats } = parseLoop(rawStep.loop);

  if (openLoop) {
    if (boundary === 'opens') {
      throw new UndisplayableThermoCyclerProtocolError(
        `Loop wird geoeffnet, obwohl noch einer offen ist: ${rawStep.loop}.`,
      );
    }

    const loop = [...openLoop, rawStep];

    return boundary === 'closes'
      ? { stages: [...stages, loopStage(loop)], openLoop: null }
      : { stages, openLoop: loop };
  }

  if (boundary === 'closes') {
    throw new UndisplayableThermoCyclerProtocolError(
      `Loop wird geschlossen, ohne geoeffnet worden zu sein: ${rawStep.loop}.`,
    );
  }

  if (boundary === 'opens') {
    return { stages, openLoop: [rawStep] };
  }

  return {
    stages: [...stages, { repeats: repeats ?? 1, steps: [parseStep(rawStep)] }],
    openLoop: null,
  };
}

/** The cycle count sits on an arbitrary step inside the loop, not on its boundaries. */
function loopStage(rawSteps: Array<RawStep>): ThermoCyclerStage {
  const repeats = rawSteps
    .map((rawStep) => parseLoop(rawStep.loop).repeats)
    .find((candidate) => candidate != null);

  if (repeats == null) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Zyklenzahl fehlt im Loop: ${loopDescription(rawSteps)}.`,
    );
  }

  return { repeats, steps: rawSteps.map(parseStep) };
}

function loopDescription(rawSteps: Array<RawStep>): string {
  return rawSteps.map((rawStep) => `${rawStep.Tp} °C`).join(', ');
}

function parseStep(rawStep: RawStep): ThermoCyclerStep {
  const { rampRate } = parseLoop(rawStep.loop);

  return {
    temperature: rawStep.Tp,
    hold: parseHold(rawStep.t),
    ...(rampRate == null ? {} : { rampRate }),
  };
}

function parseHold(hold: string): ThermoCyclerHold {
  if (hold === INDEFINITE_HOLD) {
    return { indefinite: true };
  }

  const [, amount, unit] = HOLD_PATTERN.exec(hold) ?? [];
  if (amount == null || unit == null) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Unbekannte Haltezeit: ${hold}.`,
    );
  }

  return {
    seconds: Number(amount) * (unit === 'min' ? SECONDS_PER_MINUTE : 1),
  };
}

/**
 * A loop field is one optional marker followed by an annotation:
 *
 * - `Ramp Rate 4.4` — annotation only
 * - `\ Ramp Rate 4.4` — opens a loop
 * - `&nbsp;45x Ramp Rate 2.2` — carries the cycle count
 * - `/ Ramp Rate 4.4` — closes a loop
 */
function parseLoop(loop: string): ParsedLoop {
  if (loop.indexOf(LOOP_OPENS) === 0) {
    return {
      boundary: 'opens',
      rampRate: parseRampRate(loop.slice(LOOP_OPENS.length)),
    };
  }

  if (loop.indexOf(LOOP_CLOSES) === 0) {
    return {
      boundary: 'closes',
      rampRate: parseRampRate(loop.slice(LOOP_CLOSES.length)),
    };
  }

  const [marker, repeats] = REPEATS_PATTERN.exec(loop) ?? [];
  if (marker != null && repeats != null) {
    return {
      repeats: Number(repeats),
      rampRate: parseRampRate(loop.slice(marker.length)),
    };
  }

  return { rampRate: parseRampRate(loop) };
}

function parseRampRate(annotation: string): number | undefined {
  if (annotation === '') {
    return undefined;
  }

  const [, rate] = RAMP_RATE_PATTERN.exec(annotation) ?? [];
  if (rate == null) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Unbekannte Loop-Anmerkung: ${annotation}.`,
    );
  }

  /** `parseGermanNumber` would read the decimal point as a thousands separator and turn 4.4 into 44. */
  return Number(rate);
}
