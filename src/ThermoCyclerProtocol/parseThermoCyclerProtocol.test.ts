import {
  ANNEALING_58,
  ANNEALING_60,
  MELTING_CURVE,
  WITHOUT_CYCLE_COUNT,
} from './exampleProtocols';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';

describe('parseThermoCyclerProtocol', () => {
  it('nests the loop into a stage and leaves the surrounding steps at a single pass', () => {
    expect(parseThermoCyclerProtocol(ANNEALING_58)).toStrictEqual({
      name: 'ExampleAssay_LC480_58C',
      stages: [
        {
          repeats: 1,
          steps: [{ temperature: 95, hold: { seconds: 600 }, rampRate: 4.4 }],
        },
        {
          repeats: 45,
          steps: [
            { temperature: 95, hold: { seconds: 10 }, rampRate: 4.4 },
            { temperature: 58, hold: { seconds: 30 }, rampRate: 2.2 },
            { temperature: 72, hold: { seconds: 30 }, rampRate: 4.4 },
          ],
        },
        {
          repeats: 1,
          steps: [
            { temperature: 40, hold: { indefinite: true }, rampRate: 2.2 },
          ],
        },
      ],
    });
  });

  it('keeps the annealing temperature apart between two otherwise identical protocols', () => {
    expect(
      parseThermoCyclerProtocol(ANNEALING_60).stages[1]?.steps[1],
    ).toStrictEqual({ temperature: 60, hold: { seconds: 30 }, rampRate: 2.2 });
  });

  it('reads the decimal point of a ramp rate as a decimal point', () => {
    expect(
      parseThermoCyclerProtocol(ANNEALING_58).stages[0]?.steps[0],
    ).toHaveProperty('rampRate', 4.4);
  });

  it('throws when the loop carries no cycle count', () => {
    expect(() => parseThermoCyclerProtocol(WITHOUT_CYCLE_COUNT)).toThrow(
      'Zyklenzahl fehlt im Loop: 95 °C, 58 °C, 72 °C.',
    );
  });

  it('throws on the device-specific °C/s ramp rate notation', () => {
    expect(() => parseThermoCyclerProtocol(MELTING_CURVE)).toThrow(
      'Unbekannte Loop-Anmerkung: 4.4&deg;C/s.',
    );
  });

  it('throws on the melting curve, whose second loop pair is no repetition', () => {
    const withCanonicalRampRates = {
      name: MELTING_CURVE.name,
      protocol: MELTING_CURVE.protocol.replace(
        /([\d.]+)&deg;C\/s/g,
        'Ramp Rate $1',
      ),
    };

    expect(() => parseThermoCyclerProtocol(withCanonicalRampRates)).toThrow(
      'Zyklenzahl fehlt im Loop: 95 °C, 40 °C, 75 °C.',
    );
  });
});
