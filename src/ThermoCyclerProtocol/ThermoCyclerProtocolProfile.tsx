import { Maybe } from '@mll-lab/js-utils';
import React from 'react';
import styled from 'styled-components';

import { PALETTE } from '../theme';

import { formatHold } from './formatHold';
import { TemperatureScale, temperatureScale } from './temperatureScale';
import { ThermoCyclerProtocol, ThermoCyclerStep } from './types';
import {
  DEGREES_CELSIUS,
  DEGREES_CELSIUS_PER_SECOND,
  REPEATS_SIGN,
  STAGE_LABEL,
  TRANSITION_SIGN,
  UNKNOWN_RAMP_LABEL,
} from './units';

const HEIGHT = 200;
/** Headroom for the stage header and its bracket, which the topmost plateau must not reach into. */
const PADDING_TOP = 48;
const PADDING_BOTTOM = 26;
const PADDING_X = 12;
const BASELINE_Y = HEIGHT - PADDING_BOTTOM;

const HEADER_TEXT_Y = 15;
const BRACKET_Y = 30;
const BRACKET_TICK = 7;

const TEMPERATURE_LABEL_OFFSET = 8;
const HOLD_BASELINE_OFFSET = 15;
const RAMP_LABEL_OFFSET = 6;

const DEGREES_PER_RADIAN = 180 / Math.PI;

/** No time axis: a 10 s hold beside a 600 s one cannot be drawn to scale at readable size. */
const STEP_WIDTH = 60;

/** The ramp rate is read along the slope, so the gap carries it instead of the plateau. */
const APPROACH_WIDTH = 46;

type Plateau = {
  step: ThermoCyclerStep;
  key: string;
  x: number;
  y: number;
};

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type Extent = {
  x: number;
  width: number;
};

/** Spans the plateaus of one stage — the bracket of a cycled stage reaches further left. */
type Band = Extent & {
  stageIndex: number;
  repeats: number;
  entersFromPrecedingStep: boolean;
};

/** The name is a verbatim identifier, so it is set monospaced to keep separators legible. */
const ProtocolName = styled.div`
  font-family: monospace;
  font-size: 1.15em;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const Profile = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  font-variant-numeric: tabular-nums;
`;

const Baseline = styled.line`
  stroke: ${(props) => props.theme.containerBorderColor};
`;

const PlateauLine = styled.line`
  stroke: ${PALETTE.tableHeaderBackgroundColor};
  stroke-width: 3;
`;

const ApproachLine = styled.line`
  stroke: ${PALETTE.tableHeaderBackgroundColor};
  stroke-width: 2;
`;

/** Without a ramp rate the approach is not measured, so it must not look like a measured one. */
const UnknownApproachLine = styled(ApproachLine)`
  stroke: ${PALETTE.gray5};
  stroke-dasharray: 3 2;
`;

const Bracket = styled.path`
  fill: none;
  stroke: ${PALETTE.gray7};
`;

const StageLabel = styled.text`
  fill: ${PALETTE.gray7};
  font-size: 11px;
`;

const Repeats = styled.tspan`
  fill: ${PALETTE.gray9};
  font-size: 13px;
  font-weight: 600;
`;

const TemperatureLabel = styled.text`
  fill: ${PALETTE.gray9};
  font-size: 12px;
`;

const RampLabel = styled.text`
  fill: ${PALETTE.gray7};
  font-size: 9px;
`;

const HoldLabel = styled.text`
  fill: ${PALETTE.gray9};
  font-size: 10px;
`;

function temperatureY(scale: TemperatureScale, temperature: number): number {
  return (
    BASELINE_Y - scale(temperature) * (HEIGHT - PADDING_TOP - PADDING_BOTTOM)
  );
}

/** The first step is approached flat — the source names no temperature the block starts from. */
function approachSegment(plateau: Plateau, previous: Maybe<Plateau>): Segment {
  return previous == null
    ? {
        x1: plateau.x - APPROACH_WIDTH,
        y1: plateau.y,
        x2: plateau.x,
        y2: plateau.y,
      }
    : {
        x1: previous.x + STEP_WIDTH,
        y1: previous.y,
        x2: plateau.x,
        y2: plateau.y,
      };
}

function approachLabel({ x1, y1, x2, y2 }: Segment): {
  x: number;
  y: number;
  angle: number;
} {
  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2,
    angle: Math.atan2(y2 - y1, x2 - x1) * DEGREES_PER_RADIAN,
  };
}

/**
 * The approach into the first step of a cycled stage runs on every repeat — coming from the
 * previous stage only in the first one, from the stage's own last step in all others. The cycle
 * therefore begins before that plateau.
 */
function cycleExtent({ x, width, entersFromPrecedingStep }: Band): Extent {
  return entersFromPrecedingStep
    ? { x: x - APPROACH_WIDTH, width: width + APPROACH_WIDTH }
    : { x, width };
}

function bracketPath({ x, width }: Extent): string {
  return `M ${x} ${BRACKET_Y + BRACKET_TICK} L ${x} ${BRACKET_Y} L ${
    x + width
  } ${BRACKET_Y} L ${x + width} ${BRACKET_Y + BRACKET_TICK}`;
}

function rampRateLabel({ rampRate }: ThermoCyclerStep): string {
  return rampRate == null
    ? UNKNOWN_RAMP_LABEL
    : `${TRANSITION_SIGN} ${rampRate} ${DEGREES_CELSIUS_PER_SECOND}`;
}

/** Draws each stage once and brackets the cycled ones, rather than repeating them 45 times. */
function profileLayout({ stages }: ThermoCyclerProtocol): {
  plateaus: Array<Plateau>;
  bands: Array<Band>;
  width: number;
} {
  const scale = temperatureScale(
    stages.flatMap((stage) => stage.steps.map((step) => step.temperature)),
  );
  const plateaus: Array<Plateau> = [];
  const bands: Array<Band> = [];
  let cursor = PADDING_X + APPROACH_WIDTH;

  stages.forEach((stage, stageIndex) => {
    const entersFromPrecedingStep = plateaus.length > 0;
    const stageStart = cursor;

    stage.steps.forEach((step, stepIndex) => {
      plateaus.push({
        step,
        /** Neither stages nor steps carry an ID, so their position in the protocol identifies them. */
        key: `stage-${stageIndex}-step-${stepIndex}`,
        x: cursor,
        y: temperatureY(scale, step.temperature),
      });

      cursor += STEP_WIDTH + APPROACH_WIDTH;
    });

    if (stage.steps.length > 0) {
      bands.push({
        stageIndex,
        repeats: stage.repeats,
        x: stageStart,
        width: cursor - APPROACH_WIDTH - stageStart,
        entersFromPrecedingStep,
      });
    }
  });

  return { plateaus, bands, width: cursor - APPROACH_WIDTH + PADDING_X };
}

export type ThermoCyclerProtocolProfileProps = {
  protocol: ThermoCyclerProtocol;
};

/** One plateau per step, the cycled stage under a bracket that carries its cycle count. */
export function ThermoCyclerProtocolProfile({
  protocol,
}: ThermoCyclerProtocolProfileProps) {
  const { plateaus, bands, width } = profileLayout(protocol);

  return (
    /* The name belongs over the drawing, so both share one width. */
    <div style={{ maxWidth: `${width}px` }}>
      <ProtocolName>{protocol.name}</ProtocolName>
      <Profile
        viewBox={`0 0 ${width} ${HEIGHT}`}
        role="img"
        aria-label={`Temperaturprofil mit ${plateaus.length} Schritten`}
      >
        <Baseline x1={0} y1={BASELINE_Y} x2={width} y2={BASELINE_Y} />
        {bands.map((band) => {
          const cycled = band.repeats > 1;
          /** A cycled stage's header captions its bracket, an uncycled one its own steps. */
          const extent = cycled ? cycleExtent(band) : band;

          return (
            <React.Fragment key={`header-stage-${band.stageIndex}`}>
              <StageLabel
                id={`stage-header-${band.stageIndex}`}
                x={extent.x + extent.width / 2}
                y={HEADER_TEXT_Y}
                textAnchor="middle"
              >
                {band.stageIndex + 1}. {STAGE_LABEL}
                {cycled ? (
                  <>
                    {' · '}
                    <Repeats>
                      {band.repeats} {REPEATS_SIGN}
                    </Repeats>
                  </>
                ) : null}
              </StageLabel>
              {cycled ? (
                <Bracket
                  id={`stage-bracket-${band.stageIndex}`}
                  d={bracketPath(extent)}
                />
              ) : null}
            </React.Fragment>
          );
        })}
        {plateaus.map((plateau, index) => {
          const previous = plateaus[index - 1];
          const segment = approachSegment(plateau, previous);
          const { x, y, angle } = approachLabel(segment);
          const Line =
            plateau.step.rampRate == null ? UnknownApproachLine : ApproachLine;

          return (
            <React.Fragment key={`approach-${plateau.key}`}>
              {previous == null ? null : <Line {...segment} />}
              <RampLabel
                x={x}
                y={y}
                dy={-RAMP_LABEL_OFFSET}
                textAnchor="middle"
                transform={`rotate(${angle} ${x} ${y})`}
              >
                {rampRateLabel(plateau.step)}
              </RampLabel>
            </React.Fragment>
          );
        })}
        {plateaus.map((plateau) => {
          const centerX = plateau.x + STEP_WIDTH / 2;

          return (
            <React.Fragment key={`plateau-${plateau.key}`}>
              <PlateauLine
                id={`plateau-${plateau.key}`}
                x1={plateau.x}
                y1={plateau.y}
                x2={plateau.x + STEP_WIDTH}
                y2={plateau.y}
              />
              <TemperatureLabel
                x={centerX}
                y={plateau.y - TEMPERATURE_LABEL_OFFSET}
                textAnchor="middle"
              >
                {plateau.step.temperature} {DEGREES_CELSIUS}
              </TemperatureLabel>
              <HoldLabel
                x={centerX}
                y={BASELINE_Y + HOLD_BASELINE_OFFSET}
                textAnchor="middle"
              >
                {formatHold(plateau.step.hold)}
              </HoldLabel>
            </React.Fragment>
          );
        })}
      </Profile>
    </div>
  );
}
