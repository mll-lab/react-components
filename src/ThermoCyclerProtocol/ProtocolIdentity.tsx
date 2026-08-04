import React from 'react';
import styled from 'styled-components';

import { PALETTE } from '../theme';

import { formatHold } from './formatHold';
import { ThermoCyclerProtocolSummary } from './protocolSummary';
import { ThermoCyclerProtocol, ThermoCyclerProtocolProps } from './types';
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
const EXCERPT_NOTE =
  'Ausschnitt des Cycler-Programms: Acquisition Mode und Detektionsformat stehen nicht in dieser Quelle.';

const Identity = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 4px 32px;
  font-variant-numeric: tabular-nums;
`;

/** The name is a verbatim identifier, so it is set monospaced to keep separators legible. */
const ProtocolName = styled.div`
  flex-grow: 1;
  min-width: 12em;
  font-family: monospace;
  font-size: 1.15em;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const Figure = styled.div`
  white-space: nowrap;
`;

const FigureValue = styled.span`
  font-size: 2.4em;
  font-weight: 600;
  line-height: 1;
`;

const FigureUnit = styled.span`
  margin-left: 0.15em;
`;

const FigureLabel = styled.div`
  color: ${PALETTE.gray7};
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const Origin = styled.div`
  color: ${PALETTE.gray7};
  font-size: 0.9em;
`;

/**
 * The annealing temperature alone does not identify a protocol — two assays may share it.
 * The pair with the denaturation step is what a reader checks the protocol against.
 */
const Denaturation = styled(Origin)`
  flex-basis: 100%;
`;

export const ExcerptNote = styled.p`
  margin: 8px 0 0;
  color: ${PALETTE.gray7};
  font-size: 0.85em;
`;

type ProtocolIdentityProps = {
  name: ThermoCyclerProtocol['name'];
  source: ThermoCyclerProtocolProps['source'];
  summary: ThermoCyclerProtocolSummary;
};

/** Protocol name, annealing temperature and cycle count, so none of them needs the table. */
export function ProtocolIdentity({
  name,
  source,
  summary: { cycles, annealingStep, denaturationStep },
}: ProtocolIdentityProps) {
  return (
    <>
      <Identity>
        <ProtocolName>{name}</ProtocolName>
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
