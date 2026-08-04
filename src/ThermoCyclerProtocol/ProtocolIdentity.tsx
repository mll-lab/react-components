import React from 'react';
import styled from 'styled-components';

import { PALETTE } from '../theme';

import { Annealing, ThermoCyclerProtocol } from './types';
import { ANNEALING_LABEL, DEGREES_CELSIUS } from './units';

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

/** Confusing 58 with 60 is the clinically relevant mix-up, so it is readable across the room. */
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

type ProtocolIdentityProps = {
  name: ThermoCyclerProtocol['name'];
  annealing: Annealing;
};

export function ProtocolIdentity({
  name,
  annealing: { temperature },
}: ProtocolIdentityProps) {
  return (
    <Identity>
      <ProtocolName>{name}</ProtocolName>
      <Figure>
        <FigureValue>{temperature}</FigureValue>
        <FigureUnit>{DEGREES_CELSIUS}</FigureUnit>
        <FigureLabel>{ANNEALING_LABEL}</FigureLabel>
      </Figure>
    </Identity>
  );
}
