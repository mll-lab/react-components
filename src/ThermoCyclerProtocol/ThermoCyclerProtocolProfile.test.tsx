import { render, screen } from '@testing-library/react';
import React from 'react';

import { Provider } from '../Provider';

import { ThermoCyclerProtocolProfile } from './ThermoCyclerProtocolProfile';
import { ANNEALING_58, WITHOUT_CYCLE_COUNT } from './exampleProtocols';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';

const PROTOCOL = parseThermoCyclerProtocol(ANNEALING_58);

function renderProfile(): void {
  render(
    <Provider>
      <ThermoCyclerProtocolProfile protocol={PROTOCOL} />
    </Provider>,
  );
}

describe('ThermoCyclerProtocolProfile', () => {
  it('draws every step of the staircase once, not once per cycle', () => {
    renderProfile();

    expect(screen.getAllByText('58 °C')).toHaveLength(1);
    expect(screen.getAllByText('95 °C')).toHaveLength(2);
  });

  it('carries the cycle count of the cycled stage above its steps', () => {
    renderProfile();

    expect(screen.getAllByText('45 ×')).toHaveLength(1);
  });

  it('starts the bracket of the cycled stage where the preceding plateau ends', () => {
    renderProfile();

    expect(screen.getByTestId('plateau-stage-0-step-0')).toHaveAttribute(
      'x2',
      '118',
    );
    expect(screen.getByTestId('stage-bracket-1')).toHaveAttribute(
      'd',
      expect.stringContaining('M 118 '),
    );
  });

  it('centers the header of an uncycled stage over its own steps, having no bracket', () => {
    renderProfile();

    expect(screen.getByTestId('plateau-stage-2-step-0')).toHaveAttribute(
      'x1',
      '482',
    );
    expect(screen.getByTestId('stage-header-2')).toHaveAttribute('x', '512');
  });

  it('prints hold time and the ramp rate of the approach under every step', () => {
    renderProfile();

    expect(screen.getByText('00:10:00')).toBeInTheDocument();
    expect(screen.getAllByText('00:00:30')).toHaveLength(2);
    expect(screen.getByText('∞')).toBeInTheDocument();
    expect(screen.getAllByText('→ 4.4 °C/s')).toHaveLength(3);
    expect(screen.getAllByText('→ 2.2 °C/s')).toHaveLength(2);
  });

  it('names an approach without a measured ramp rate instead of showing a zero', () => {
    render(
      <Provider>
        <ThermoCyclerProtocolProfile
          protocol={{
            name: 'ExampleAssay_LC480_58C',
            stages: [
              {
                repeats: 1,
                steps: [
                  { temperature: 95, hold: { seconds: 10 }, rampRate: 4.4 },
                  { temperature: 58, hold: { seconds: 30 } },
                ],
              },
            ],
          }}
        />
      </Provider>,
    );

    expect(screen.getByText('Anfahrt unbekannt')).toBeInTheDocument();
  });

  it('brackets a loop whose cycle count the source never carried, naming it unknown', () => {
    render(
      <Provider>
        <ThermoCyclerProtocolProfile
          protocol={parseThermoCyclerProtocol(WITHOUT_CYCLE_COUNT)}
        />
      </Provider>,
    );

    expect(screen.getByText('Zyklen unbekannt')).toBeInTheDocument();
    expect(screen.getByTestId('stage-bracket-1')).toBeInTheDocument();
  });

  it('leads with the protocol name above the drawing', () => {
    renderProfile();

    expect(screen.getByText(PROTOCOL.name)).toBeInTheDocument();
  });
});
