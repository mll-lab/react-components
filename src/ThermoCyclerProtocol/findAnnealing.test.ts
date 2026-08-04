import { ANNEALING_58 } from './exampleProtocols';
import { findAnnealing } from './findAnnealing';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';

describe('findAnnealing', () => {
  it('takes the coolest step of the cycled stage', () => {
    expect(
      findAnnealing(parseThermoCyclerProtocol(ANNEALING_58)),
    ).toStrictEqual({
      stageIndex: 1,
      stepIndex: 1,
      temperature: 58,
    });
  });

  it('throws instead of guessing the cycle count when every stage runs a single pass', () => {
    expect(() =>
      findAnnealing({
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
      findAnnealing({
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
