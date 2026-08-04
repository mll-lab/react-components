import { render, screen } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { Provider } from '../Provider';

import { ThermoCyclerProtocolProfile } from './ThermoCyclerProtocolProfile';
import { ANNEALING_58 } from './exampleProtocols';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';
import { ANNEALING_LABEL } from './units';

const PROTOCOL = parseThermoCyclerProtocol(ANNEALING_58);

function renderInProvider(element: ReactElement): void {
  render(<Provider>{element}</Provider>);
}

describe('ThermoCyclerProtocolProfile', () => {
  it('draws every step of the staircase once, not once per cycle', () => {
    renderInProvider(
      <ThermoCyclerProtocolProfile protocol={PROTOCOL} source="NeMo" />,
    );

    expect(screen.getAllByText('58 °C')).toHaveLength(1);
    expect(screen.getAllByText('95 °C')).toHaveLength(2);
  });

  it('carries the cycle count of the cycled stage above its steps', () => {
    renderInProvider(
      <ThermoCyclerProtocolProfile protocol={PROTOCOL} source="NeMo" />,
    );

    expect(screen.getAllByText('45 ×')).toHaveLength(1);
  });

  it('prints hold time and the ramp rate of the approach under every step', () => {
    renderInProvider(
      <ThermoCyclerProtocolProfile protocol={PROTOCOL} source="NeMo" />,
    );

    expect(screen.getByText('00:10:00')).toBeInTheDocument();
    expect(screen.getAllByText('00:00:30')).toHaveLength(2);
    expect(screen.getByText('∞')).toBeInTheDocument();
    expect(screen.getAllByText('→ 4.4 °C/s')).toHaveLength(3);
    expect(screen.getAllByText('→ 2.2 °C/s')).toHaveLength(2);
  });

  it('marks the annealing plateau by name, not by colour alone', () => {
    renderInProvider(
      <ThermoCyclerProtocolProfile protocol={PROTOCOL} source="NeMo" />,
    );

    expect(screen.getAllByText(ANNEALING_LABEL)).toHaveLength(2);
  });
});

describe('ProtocolIdentity', () => {
  it('states protocol name, annealing pair and origin without the table', () => {
    renderInProvider(
      <ThermoCyclerProtocolProfile protocol={PROTOCOL} source="NeMo" />,
    );

    expect(screen.getByText(PROTOCOL.name)).toBeInTheDocument();
    expect(screen.getByText('58')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(
      screen.getByText('Denaturierung 95 °C / 00:00:10'),
    ).toBeInTheDocument();
    expect(screen.getByText('aus NeMo')).toBeInTheDocument();
  });
});
