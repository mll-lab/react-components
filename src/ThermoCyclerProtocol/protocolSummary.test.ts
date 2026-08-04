import { ANNEALING_58 } from './exampleProtocols';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';
import { protocolSummary } from './protocolSummary';

describe('protocolSummary', () => {
  it('takes the annealing temperature from the coolest step of the cycled stage', () => {
    expect(
      protocolSummary(parseThermoCyclerProtocol(ANNEALING_58)),
    ).toStrictEqual({
      cycles: 45,
      annealingStep: { temperature: 58, hold: { seconds: 30 }, rampRate: 2.2 },
      denaturationStep: {
        temperature: 95,
        hold: { seconds: 10 },
        rampRate: 4.4,
      },
      annealingPosition: { stageIndex: 1, stepIndex: 1 },
    });
  });

  it('throws instead of rendering a protocol whose stages all run a single pass', () => {
    expect(() =>
      protocolSummary({
        name: 'ExampleAssay_LC480_58C',
        stages: [
          { repeats: 1, steps: [{ temperature: 58, hold: { seconds: 30 } }] },
        ],
      }),
    ).toThrow(
      'Zyklenzahl unbekannt, Protokoll wird nicht dargestellt: ExampleAssay_LC480_58C.',
    );
  });

  it('throws instead of guessing which of several cycled stages anneals', () => {
    expect(() =>
      protocolSummary({
        name: 'ExampleAssay_LC480_60C',
        stages: [
          { repeats: 10, steps: [{ temperature: 60, hold: { seconds: 30 } }] },
          { repeats: 40, steps: [{ temperature: 58, hold: { seconds: 30 } }] },
        ],
      }),
    ).toThrow(
      'Annealing nicht eindeutig bestimmbar, mehrere Programme mit Zyklen: ExampleAssay_LC480_60C.',
    );
  });
});
