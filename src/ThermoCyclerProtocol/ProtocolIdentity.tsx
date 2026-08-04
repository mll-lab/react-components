import React from 'react';
import styled from 'styled-components';

import { PALETTE } from '../theme';

import { formatHold } from './formatHold';
import { protocolSummary } from './protocolSummary';
import { ThermoCyclerProtocolProps } from './types';
import {
  ANNEALING_DERIVATION_NOTE,
  ANNEALING_LABEL,
  DEGREES_CELSIUS,
  REPEATS_SIGN,
} from './units';

/**
 * Acquisition mode and detection format live in the device template, not in the protocol source,
 * so the view must not read as the complete device program.
 */
export const EXCERPT_NOTE =
  'Ausschnitt des Cycler-Programms: Acquisition Mode und Detektionsformat stehen nicht in dieser Quelle.';

const Identity = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 4px 32px;
`;

/** The name is a verbatim identifier, so it is set monospaced to keep separators legible. */
export const ProtocolName = styled.div`
  flex: 1 1 auto;
  min-width: 12em;
  font-family: monospace;
  font-size: 1.15em;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const Figure = styled.div`
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const FigureValue = styled.span`
  font-size: 2.4em;
  font-weight: 600;
  line-height: 1;
`;

const FigureUnit = styled.span`
  margin-left: 0.15em;
  font-size: 1em;
`;

const FigureLabel = styled.div`
  color: ${PALETTE.gray7};
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const Origin = styled.div`
  color: ${PALETTE.gray7};
  font-size: 0.9em;
`;

/**
 * The annealing temperature alone does not identify a protocol — two assays may share it.
 * The pair with the denaturation step is what a reader checks the protocol against.
 */
const Denaturation = styled.div`
  flex-basis: 100%;
  color: ${PALETTE.gray7};
  font-size: 0.9em;
  font-variant-numeric: tabular-nums;
`;

export const ExcerptNote = styled.p`
  margin: 8px 0 0;
  color: ${PALETTE.gray7};
  font-size: 0.85em;
`;

/** Protocol name, annealing temperature and cycle count, so none of them needs the table. */
export function ProtocolIdentity({
  protocol,
  source,
}: ThermoCyclerProtocolProps) {
  const { cycles, annealingStep, denaturationStep } = protocolSummary(protocol);

  return (
    <>
      <Identity>
        <ProtocolName>{protocol.name}</ProtocolName>
        <Figure>
          <FigureValue>{annealingStep.temperature}</FigureValue>
          <FigureUnit>{DEGREES_CELSIUS}</FigureUnit>
          <FigureLabel>{ANNEALING_LABEL}</FigureLabel>
        </Figure>
        <Figure>
          <FigureValue>{cycles}</FigureValue>
          <FigureUnit>{REPEATS_SIGN}</FigureUnit>
          <FigureLabel>Zyklen</FigureLabel>
        </Figure>
        <Origin>aus {source}</Origin>
        <Denaturation>
          Denaturierung {denaturationStep.temperature} {DEGREES_CELSIUS} /{' '}
          {formatHold(denaturationStep.hold)}
        </Denaturation>
      </Identity>
      <ExcerptNote>
        {EXCERPT_NOTE} {ANNEALING_DERIVATION_NOTE}
      </ExcerptNote>
    </>
  );
}
