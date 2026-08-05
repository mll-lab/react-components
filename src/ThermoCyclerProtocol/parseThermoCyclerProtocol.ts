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

type RawProtocol = {
  steps: Array<RawStep>;
  rampRate?: number;
};

export type LoopBoundary = 'opens' | 'closes';

type ParsedLoop = {
  boundary?: LoopBoundary;
  repeats?: number;
  rampRate?: number;
};

/** A step whose loop field is read, before its place in the loop structure is resolved. */
type DecomposedStep = {
  rawStep: RawStep;
  loop: ParsedLoop;
};

const INDEFINITE_HOLDS: Array<string> = ['Cool', 'forever'];
const HOLD_PATTERN = /^(\d+)\s*(sec|min)$/;

const STEP_INDEX_PATTERN = /^\d+$/;

/** Block cyclers store one ramp rate for the whole protocol instead of one per step. */
const PROTOCOL_RAMP_RATE_KEY = 'rampRate';
const NUMBER_PATTERN = /^\d+(?:\.\d+)?$/;

const LOOP_OPENS_PATTERN = /^\\\s*/;
const LOOP_CLOSES_PATTERN = /^\/\/?\s*/;
const REPEATS_PREFIX_PATTERN = /^&nbsp;\s*(?:(\d+)x|x\s*(\d+))\s*/;
const REPEATS_SUFFIX_PATTERN = /\s*(\d+)x$/;
/** `Slope` is what a LightCycler calls the same quantity. */
const RAMP_RATE_PATTERN = /^(?:Ramp Rate|Slope) (\d+(?:\.\d+)?)$/;

export function parseThermoCyclerProtocol({
  name,
  protocol,
}: {
  name: ThermoCyclerProtocol['name'];
  protocol: string;
}): ThermoCyclerProtocol {
  const { steps, rampRate } = parseRawProtocol(protocol);
  const stages = parseStages(bracketImplicitLoop(steps.map(decomposeStep)));

  return {
    name,
    stages: rampRate == null ? stages : withRampRate(stages, rampRate),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value != null;
}

function parseRawProtocol(protocol: string): RawProtocol {
  const parsed: unknown = parseJson(protocol);
  if (!isRecord(parsed)) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Protokoll ist kein Objekt: ${protocol}.`,
    );
  }

  /** The keys are array indices, so they enumerate in the order the steps run. */
  const steps = Object.keys(parsed)
    .filter((key) => key !== PROTOCOL_RAMP_RATE_KEY)
    .map((key) => {
      if (!STEP_INDEX_PATTERN.test(key)) {
        throw new UndisplayableThermoCyclerProtocolError(
          `Protokolleintrag ist kein Schritt: ${key}.`,
        );
      }

      return parseRawStep(parsed[key], key);
    });

  return {
    steps,
    rampRate: parseProtocolRampRate(parsed[PROTOCOL_RAMP_RATE_KEY]),
  };
}

function parseJson(protocol: string): unknown {
  try {
    return JSON.parse(protocol);
  } catch {
    throw new UndisplayableThermoCyclerProtocolError(
      `Protokoll ist kein JSON: ${protocol}.`,
    );
  }
}

function parseProtocolRampRate(entry: unknown): number | undefined {
  if (entry == null) {
    return undefined;
  }

  const rate = isRecord(entry) ? entry.Temp : undefined;
  if (typeof rate !== 'string' || !NUMBER_PATTERN.test(rate)) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Rampenrate des Protokolls ist unlesbar: ${JSON.stringify(entry)}.`,
    );
  }

  return Number(rate);
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

function decomposeStep(rawStep: RawStep): DecomposedStep {
  return { rawStep, loop: parseLoop(rawStep.loop) };
}

/**
 * An export that never bracketed its loop leaves the cycle count on every step of it, so
 * consecutive steps carrying the same count are one loop and not one stage each.
 * Restricting this to protocols without any bracket keeps it from nesting a loop.
 */
function bracketImplicitLoop(
  steps: Array<DecomposedStep>,
): Array<DecomposedStep> {
  if (steps.some((step) => step.loop.boundary != null)) {
    return steps;
  }

  return steps.map((step, index) => {
    const { repeats } = step.loop;
    const startsLoop = steps[index - 1]?.loop.repeats !== repeats;
    const endsLoop = steps[index + 1]?.loop.repeats !== repeats;

    if (repeats == null || startsLoop === endsLoop) {
      return step;
    }

    return {
      ...step,
      loop: { ...step.loop, boundary: startsLoop ? 'opens' : 'closes' },
    };
  });
}

type CollectedStages = {
  stages: Array<ThermoCyclerStage>;
  openLoop: Maybe<Array<DecomposedStep>>;
};

const NOTHING_COLLECTED: CollectedStages = { stages: [], openLoop: null };

function parseStages(steps: Array<DecomposedStep>): Array<ThermoCyclerStage> {
  const { stages, openLoop } = steps.reduce(collectStage, NOTHING_COLLECTED);

  if (openLoop) {
    throw new UndisplayableThermoCyclerProtocolError(
      `Loop wird nicht geschlossen: ${loopDescription(openLoop)}.`,
    );
  }

  return stages;
}

function collectStage(
  { stages, openLoop }: CollectedStages,
  step: DecomposedStep,
): CollectedStages {
  const { boundary, repeats } = step.loop;

  if (openLoop) {
    if (boundary === 'opens') {
      throw new UndisplayableThermoCyclerProtocolError(
        `Loop wird geoeffnet, obwohl noch einer offen ist: ${step.rawStep.loop}.`,
      );
    }

    const loop = [...openLoop, step];

    return boundary === 'closes'
      ? { stages: [...stages, loopStage(loop)], openLoop: null }
      : { stages, openLoop: loop };
  }

  if (boundary === 'closes') {
    throw new UndisplayableThermoCyclerProtocolError(
      `Loop wird geschlossen, ohne geoeffnet worden zu sein: ${step.rawStep.loop}.`,
    );
  }

  if (boundary === 'opens') {
    return { stages, openLoop: [step] };
  }

  return {
    stages: [...stages, { repeats: repeats ?? 1, steps: [parseStep(step)] }],
    openLoop: null,
  };
}

/** The cycle count sits on an arbitrary step of the loop, its boundaries included. */
function loopStage(steps: Array<DecomposedStep>): ThermoCyclerStage {
  const repeats = steps
    .map((step) => step.loop.repeats)
    .find((candidate) => candidate != null);

  /**
   * A loop the source never counted keeps its readable steps and is drawn without a count.
   * Any number here would be indistinguishable from one the source actually carried.
   */
  return { repeats: repeats ?? null, steps: steps.map(parseStep) };
}

function loopDescription(steps: Array<DecomposedStep>): string {
  return steps.map((step) => `${step.rawStep.Tp} °C`).join(', ');
}

function parseStep({ rawStep, loop }: DecomposedStep): ThermoCyclerStep {
  return {
    temperature: rawStep.Tp,
    hold: parseHold(rawStep.t),
    ...(loop.rampRate == null ? {} : { rampRate: loop.rampRate }),
  };
}

/** A protocol-wide ramp rate describes every approach the steps do not describe themselves. */
function withRampRate(
  stages: Array<ThermoCyclerStage>,
  rampRate: number,
): Array<ThermoCyclerStage> {
  return stages.map((stage) => ({
    ...stage,
    steps: stage.steps.map((step) => ({ rampRate, ...step })),
  }));
}

export function parseHold(hold: string): ThermoCyclerHold {
  if (INDEFINITE_HOLDS.includes(hold)) {
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
 * A loop field holds an optional marker, an optional cycle count and an optional annotation,
 * in notations that differ per device:
 *
 * - `Ramp Rate 4.4`, `Slope 20` — annotation only
 * - `\ Slope 20`, `\` — opens a loop
 * - `&nbsp;45x`, `&nbsp;x 45`, `Slope 20 45x` — carry the cycle count
 * - `/ Slope 20 41x`, `//&nbsp;40x` — close a loop and carry the count
 */
export function parseLoop(loop: string): ParsedLoop {
  const { boundary, rest: counted } = parseBoundary(loop);
  const { repeats, rest: annotation } = parseRepeats(counted);

  return { boundary, repeats, rampRate: parseRampRate(annotation.trim()) };
}

function parseBoundary(loop: string): {
  boundary?: LoopBoundary;
  rest: string;
} {
  const [opens] = LOOP_OPENS_PATTERN.exec(loop) ?? [];
  if (opens != null) {
    return { boundary: 'opens', rest: loop.slice(opens.length) };
  }

  const [closes] = LOOP_CLOSES_PATTERN.exec(loop) ?? [];
  if (closes != null) {
    return { boundary: 'closes', rest: loop.slice(closes.length) };
  }

  return { rest: loop };
}

function parseRepeats(counted: string): { repeats?: number; rest: string } {
  const [prefix, beforeX, afterX] = REPEATS_PREFIX_PATTERN.exec(counted) ?? [];
  if (prefix != null) {
    return {
      repeats: Number(beforeX ?? afterX),
      rest: counted.slice(prefix.length),
    };
  }

  const suffix = REPEATS_SUFFIX_PATTERN.exec(counted);
  if (suffix) {
    return {
      repeats: Number(suffix[1]),
      rest: counted.slice(0, suffix.index),
    };
  }

  return { rest: counted };
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
