import React from 'react';
import styled from 'styled-components';

import { PALETTE } from '../theme';

import { ExcerptNote, ProtocolIdentity } from './ProtocolIdentity';
import { formatHold } from './formatHold';
import { protocolSummary } from './protocolSummary';
import { StageRow, StepRow, stageRows, stepTemperatures } from './stageRows';
import { TemperatureScale, temperatureScale } from './temperatureScale';
import { ThermoCyclerProtocolProps } from './types';
import {
  ANNEALING_LABEL,
  DEGREES_CELSIUS,
  DEGREES_CELSIUS_PER_SECOND,
  REPEATS_SIGN,
  STAGE_LABEL,
  TRANSITION_SIGN,
  UNKNOWN_RAMP_LABEL,
} from './units';

const HEIGHT = 200;
const PADDING_TOP = 48;
const PADDING_BOTTOM = 40;
const PADDING_X = 12;
const BASELINE_Y = HEIGHT - PADDING_BOTTOM;

const HEADER_TEXT_Y = 15;
const BRACKET_Y = 30;
const BRACKET_TICK = 7;

const LABEL_OFFSET = 8;
const ANNEALING_MARKER_OFFSET = 21;
const HOLD_BASELINE_OFFSET = 15;
const RAMP_BASELINE_OFFSET = 29;

const ANNEALING_FONT_WEIGHT = 700;

/**
 * Every step is equally wide and every transition equally long. A hold of 10 s beside one of
 * 600 s cannot be drawn to scale at readable size, and a compressed axis still reads as a
 * duration — so this view claims no time axis at all and prints hold time and ramp rate as text.
 */
const STEP_WIDTH = 88;
const TRANSITION_WIDTH = 30;

type Plateau = {
  step: StepRow;
  x: number;
  y: number;
};

type Transition = {
  step: StepRow;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

type Band = {
  stageIndex: number;
  repeats: number;
  x: number;
  width: number;
};

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

/**
 * A dark, heavier plateau rather than another hue: the marking has to survive a greyscale
 * printout, where colour alone carries nothing.
 */
const AnnealingPlateauLine = styled.line`
  stroke: ${PALETTE.gray9};
  stroke-width: 6;
`;

const TransitionLine = styled.line`
  stroke: ${PALETTE.tableHeaderBackgroundColor};
  stroke-width: 2;
`;

/** Without a ramp rate the transition is not measured, so it must not look like a measured one. */
const UnknownTransitionLine = styled(TransitionLine)`
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

const Repeats = styled.text`
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

const AnnealingMarker = styled(RampLabel)`
  letter-spacing: 0.06em;
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

/** Draws each stage once and brackets the cycled ones, rather than repeating them 45 times. */
function profileLayout(stages: Array<StageRow>): {
  plateaus: Array<Plateau>;
  transitions: Array<Transition>;
  bands: Array<Band>;
  width: number;
} {
  const scale = temperatureScale(stepTemperatures(stages));
  const plateaus: Array<Plateau> = [];
  const transitions: Array<Transition> = [];
  const bands: Array<Band> = [];
  let cursor = PADDING_X;

  stages.forEach((stage) => {
    const stageStart = cursor;

    stage.steps.forEach((step) => {
      const previous = plateaus[plateaus.length - 1];
      const y = temperatureY(scale, step.temperature);

      if (previous != null) {
        transitions.push({
          step,
          fromX: previous.x + STEP_WIDTH,
          fromY: previous.y,
          toX: cursor,
          toY: y,
        });
      }

      plateaus.push({ step, x: cursor, y });
      cursor += STEP_WIDTH + TRANSITION_WIDTH;
    });

    bands.push({
      stageIndex: stage.stageIndex,
      repeats: stage.repeats,
      x: stageStart,
      width: cursor - TRANSITION_WIDTH - stageStart,
    });
  });

  return {
    plateaus,
    transitions,
    bands,
    width: cursor - TRANSITION_WIDTH + PADDING_X,
  };
}

function bracketPath({ x, width }: Band): string {
  return `M ${x} ${BRACKET_Y + BRACKET_TICK} L ${x} ${BRACKET_Y} L ${
    x + width
  } ${BRACKET_Y} L ${x + width} ${BRACKET_Y + BRACKET_TICK}`;
}

function rampRateLabel({ rampRate }: StepRow): string {
  return rampRate == null
    ? UNKNOWN_RAMP_LABEL
    : `${TRANSITION_SIGN} ${rampRate} ${DEGREES_CELSIUS_PER_SECOND}`;
}

/**
 * The protocol as a schematic staircase: one plateau per step, the cycled stage under a bracket
 * that carries its cycle count. Hold time and the ramp rate of the approach stand under the step.
 */
export function ThermoCyclerProtocolProfile({
  protocol,
  source,
}: ThermoCyclerProtocolProps) {
  const summary = protocolSummary(protocol);
  const { plateaus, transitions, bands, width } = profileLayout(
    stageRows(protocol, summary.annealingPosition),
  );

  return (
    <>
      <ProtocolIdentity
        name={protocol.name}
        source={source}
        summary={summary}
      />
      <Profile
        viewBox={`0 0 ${width} ${HEIGHT}`}
        style={{ maxWidth: `${width}px` }}
        role="img"
        aria-label={`Temperaturprofil mit ${plateaus.length} Schritten`}
      >
        <Baseline x1={0} y1={BASELINE_Y} x2={width} y2={BASELINE_Y} />
        {bands.map((band) => (
          <React.Fragment key={`header-stage-${band.stageIndex}`}>
            <StageLabel x={band.x} y={HEADER_TEXT_Y}>
              {band.stageIndex + 1}. {STAGE_LABEL}
            </StageLabel>
            {band.repeats > 1 ? (
              <>
                <Repeats
                  x={band.x + band.width}
                  y={HEADER_TEXT_Y}
                  textAnchor="end"
                >
                  {band.repeats} {REPEATS_SIGN}
                </Repeats>
                <Bracket d={bracketPath(band)} />
              </>
            ) : null}
          </React.Fragment>
        ))}
        {transitions.map((transition) => {
          const Line =
            transition.step.rampRate == null
              ? UnknownTransitionLine
              : TransitionLine;

          return (
            <Line
              key={`transition-${transition.step.key}`}
              x1={transition.fromX}
              y1={transition.fromY}
              x2={transition.toX}
              y2={transition.toY}
            />
          );
        })}
        {plateaus.map((plateau) => {
          const Line = plateau.step.isAnnealing
            ? AnnealingPlateauLine
            : PlateauLine;
          const centerX = plateau.x + STEP_WIDTH / 2;

          return (
            <React.Fragment key={`plateau-${plateau.step.key}`}>
              <Line
                x1={plateau.x}
                y1={plateau.y}
                x2={plateau.x + STEP_WIDTH}
                y2={plateau.y}
              />
              {plateau.step.isAnnealing ? (
                <AnnealingMarker
                  x={centerX}
                  y={plateau.y - ANNEALING_MARKER_OFFSET}
                  textAnchor="middle"
                >
                  {ANNEALING_LABEL}
                </AnnealingMarker>
              ) : null}
              <TemperatureLabel
                x={centerX}
                y={plateau.y - LABEL_OFFSET}
                textAnchor="middle"
                fontWeight={
                  plateau.step.isAnnealing ? ANNEALING_FONT_WEIGHT : undefined
                }
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
              <RampLabel
                x={centerX}
                y={BASELINE_Y + RAMP_BASELINE_OFFSET}
                textAnchor="middle"
              >
                {rampRateLabel(plateau.step)}
              </RampLabel>
            </React.Fragment>
          );
        })}
      </Profile>
      <ExcerptNote>
        Keine Zeitachse — jeder Schritt ist gleich breit. Unter dem Schritt
        stehen seine Haltezeit und die Ramp Rate der Anfahrt; eine unbekannte
        Anfahrt bleibt eine gestrichelte Lücke.
      </ExcerptNote>
    </>
  );
}
