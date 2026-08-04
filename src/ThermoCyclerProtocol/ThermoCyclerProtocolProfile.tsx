import React from 'react';
import styled from 'styled-components';

import { PALETTE } from '../theme';

import { ProtocolIdentity } from './ProtocolIdentity';
import { formatHold } from './formatHold';
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
const PADDING_BOTTOM = 26;
const PADDING_X = 12;
const BASELINE_Y = HEIGHT - PADDING_BOTTOM;

const HEADER_TEXT_Y = 15;
const BRACKET_Y = 30;
const BRACKET_TICK = 7;

const LABEL_OFFSET = 8;
const ANNEALING_MARKER_OFFSET = 21;
const HOLD_BASELINE_OFFSET = 15;
const RAMP_LABEL_OFFSET = 6;

const ANNEALING_FONT_WEIGHT = 700;

const DEGREES_PER_RADIAN = 180 / Math.PI;

/** No time axis: a 10 s hold beside a 600 s one cannot be drawn to scale at readable size. */
const STEP_WIDTH = 60;

/** The ramp rate is read along the slope, so the gap carries it instead of the plateau. */
const APPROACH_WIDTH = 46;

type Plateau = {
  step: StepRow;
  x: number;
  y: number;
};

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

/**
 * The approach into a step: its ramp rate is a property of getting there, not of staying there.
 * The first step has no segment — the source names no temperature the block starts from.
 */
type Approach = {
  step: StepRow;
  labelX: number;
  labelY: number;
  angle: number;
  segment: Segment | null;
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

/** Darker and heavier rather than another hue, so the marking survives a greyscale printout. */
const AnnealingPlateauLine = styled.line`
  stroke: ${PALETTE.gray9};
  stroke-width: 6;
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

/** Along the slope for a drawn approach, centred in the leading gap for the first step. */
function approachLabel(
  segment: Segment | null,
  plateauX: number,
  plateauY: number,
): Pick<Approach, 'labelX' | 'labelY' | 'angle'> {
  if (segment == null) {
    return {
      labelX: plateauX - APPROACH_WIDTH / 2,
      labelY: plateauY,
      angle: 0,
    };
  }

  return {
    labelX: (segment.x1 + segment.x2) / 2,
    labelY: (segment.y1 + segment.y2) / 2,
    angle:
      Math.atan2(segment.y2 - segment.y1, segment.x2 - segment.x1) *
      DEGREES_PER_RADIAN,
  };
}

/** Draws each stage once and brackets the cycled ones, rather than repeating them 45 times. */
function profileLayout(stages: Array<StageRow>): {
  plateaus: Array<Plateau>;
  approaches: Array<Approach>;
  bands: Array<Band>;
  width: number;
} {
  const scale = temperatureScale(stepTemperatures(stages));
  const plateaus: Array<Plateau> = [];
  const approaches: Array<Approach> = [];
  const bands: Array<Band> = [];
  let cursor = PADDING_X + APPROACH_WIDTH;

  stages.forEach((stage) => {
    /**
     * The approach into the first step of a cycled stage runs on every repeat — coming from the
     * previous stage only in the first one, from the stage's own last step in all others. The
     * bracket therefore starts before it, not at the plateau.
     */
    const bracketStart = plateaus.length > 0 ? cursor - APPROACH_WIDTH : cursor;

    stage.steps.forEach((step) => {
      const previous = plateaus[plateaus.length - 1];
      const y = temperatureY(scale, step.temperature);
      const segment =
        previous == null
          ? null
          : {
              x1: previous.x + STEP_WIDTH,
              y1: previous.y,
              x2: cursor,
              y2: y,
            };

      approaches.push({
        step,
        ...approachLabel(segment, cursor, y),
        segment,
      });

      plateaus.push({ step, x: cursor, y });
      cursor += STEP_WIDTH + APPROACH_WIDTH;
    });

    bands.push({
      stageIndex: stage.stageIndex,
      repeats: stage.repeats,
      x: bracketStart,
      width: cursor - APPROACH_WIDTH - bracketStart,
    });
  });

  return {
    plateaus,
    approaches,
    bands,
    width: cursor - APPROACH_WIDTH + PADDING_X,
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

/** One plateau per step, the cycled stage under a bracket that carries its cycle count. */
export function ThermoCyclerProtocolProfile({
  protocol,
  annealing,
}: ThermoCyclerProtocolProps) {
  const { plateaus, approaches, bands, width } = profileLayout(
    stageRows(protocol, annealing),
  );

  return (
    /* The annealing temperature belongs over the drawing, so both share one width. */
    <div style={{ maxWidth: `${width}px` }}>
      <ProtocolIdentity name={protocol.name} annealing={annealing} />
      <Profile
        viewBox={`0 0 ${width} ${HEIGHT}`}
        role="img"
        aria-label={`Temperaturprofil mit ${plateaus.length} Schritten`}
      >
        <Baseline x1={0} y1={BASELINE_Y} x2={width} y2={BASELINE_Y} />
        {bands.map((band) => (
          <React.Fragment key={`header-stage-${band.stageIndex}`}>
            <StageLabel
              x={band.x + band.width / 2}
              y={HEADER_TEXT_Y}
              textAnchor="middle"
            >
              {band.stageIndex + 1}. {STAGE_LABEL}
              {band.repeats > 1 ? (
                <>
                  {' · '}
                  <Repeats>
                    {band.repeats} {REPEATS_SIGN}
                  </Repeats>
                </>
              ) : null}
            </StageLabel>
            {band.repeats > 1 ? (
              <Bracket
                id={`stage-bracket-${band.stageIndex}`}
                d={bracketPath(band)}
              />
            ) : null}
          </React.Fragment>
        ))}
        {approaches.map((approach) => {
          const Line =
            approach.step.rampRate == null ? UnknownApproachLine : ApproachLine;

          return (
            <React.Fragment key={`approach-${approach.step.key}`}>
              {approach.segment != null ? (
                <Line
                  x1={approach.segment.x1}
                  y1={approach.segment.y1}
                  x2={approach.segment.x2}
                  y2={approach.segment.y2}
                />
              ) : null}
              <RampLabel
                x={approach.labelX}
                y={approach.labelY}
                dy={-RAMP_LABEL_OFFSET}
                textAnchor="middle"
                transform={`rotate(${approach.angle} ${approach.labelX} ${approach.labelY})`}
              >
                {rampRateLabel(approach.step)}
              </RampLabel>
            </React.Fragment>
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
                id={`plateau-${plateau.step.key}`}
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
            </React.Fragment>
          );
        })}
      </Profile>
    </div>
  );
}
