import { UndisplayableThermoCyclerProtocolError } from './UndisplayableThermoCyclerProtocolError';
import {
  ANNEALING_58,
  COUNT_AT_LOOP_CLOSE,
  IMPLICIT_LOOP,
  MELTING_CURVE,
  MELTING_CURVE_WITH_CANONICAL_RAMP_RATES,
  NESTED_LOOPS,
  PROTOCOL_RAMP_RATE,
  TRUNCATED,
  WITHOUT_CYCLE_COUNT,
  WITHOUT_STEPS,
  WITH_UNKNOWN_ENTRY,
} from './exampleProtocols';
import {
  LoopBoundary,
  parseHold,
  parseLoop,
  parseThermoCyclerProtocol,
} from './parseThermoCyclerProtocol';
import { ThermoCyclerHold } from './types';

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

  it('keeps a loop without a cycle count and marks the count as unknown', () => {
    expect(
      parseThermoCyclerProtocol(WITHOUT_CYCLE_COUNT).stages[1],
    ).toStrictEqual({
      repeats: null,
      steps: [
        { temperature: 95, hold: { seconds: 10 }, rampRate: 4.4 },
        { temperature: 58, hold: { seconds: 30 }, rampRate: 2.2 },
        { temperature: 72, hold: { seconds: 30 }, rampRate: 4.4 },
      ],
    });
  });

  it('takes the cycle count from the marker that closes the loop', () => {
    expect(
      parseThermoCyclerProtocol(COUNT_AT_LOOP_CLOSE).stages[1],
    ).toHaveProperty('repeats', 41);
  });

  it('describes every approach with a ramp rate that stands for the whole protocol', () => {
    expect(parseThermoCyclerProtocol(PROTOCOL_RAMP_RATE)).toStrictEqual({
      name: 'ExampleAssay_LC480_58C',
      stages: [
        {
          repeats: 1,
          steps: [{ temperature: 94, hold: { seconds: 300 }, rampRate: 3 }],
        },
        {
          repeats: 35,
          steps: [
            { temperature: 95, hold: { seconds: 45 }, rampRate: 3 },
            { temperature: 58, hold: { seconds: 45 }, rampRate: 3 },
            { temperature: 72, hold: { seconds: 45 }, rampRate: 3 },
          ],
        },
        {
          repeats: 1,
          steps: [{ temperature: 12, hold: { indefinite: true }, rampRate: 3 }],
        },
      ],
    });
  });

  it('brackets an unbracketed loop instead of turning each of its steps into a stage', () => {
    expect(parseThermoCyclerProtocol(IMPLICIT_LOOP).stages).toStrictEqual([
      { repeats: 1, steps: [{ temperature: 95, hold: { seconds: 900 } }] },
      {
        repeats: 35,
        steps: [
          { temperature: 95, hold: { seconds: 60 } },
          { temperature: 58, hold: { seconds: 60 } },
          { temperature: 72, hold: { seconds: 150 } },
        ],
      },
      { repeats: 1, steps: [{ temperature: 72, hold: { seconds: 600 } }] },
    ]);
  });

  it('throws when a loop opens inside an open loop instead of flattening both', () => {
    expect(() => parseThermoCyclerProtocol(NESTED_LOOPS)).toThrow(
      String.raw`Loop wird geoeffnet, obwohl noch einer offen ist: \ Ramp Rate 2.2.`,
    );
  });

  it('throws on the device-specific °C/s ramp rate notation', () => {
    expect(() => parseThermoCyclerProtocol(MELTING_CURVE)).toThrow(
      'Unbekannte Loop-Anmerkung: 4.4&deg;C/s.',
    );
  });

  it('throws on the melting curve, whose continuous ramp carries no hold time', () => {
    expect(() =>
      parseThermoCyclerProtocol(MELTING_CURVE_WITH_CANONICAL_RAMP_RATES),
    ).toThrow('Unbekannte Haltezeit: .');
  });

  it('refuses a protocol that was never complete JSON without letting a SyntaxError escape', () => {
    expect(() => parseThermoCyclerProtocol(TRUNCATED)).toThrow(
      UndisplayableThermoCyclerProtocolError,
    );
  });

  it('refuses a protocol without a single step instead of returning nothing to draw', () => {
    expect(() => parseThermoCyclerProtocol(WITHOUT_STEPS)).toThrow(
      'Protokoll ohne Schritte: {"rampRate":{"Temp":"3","name":"Temperature Ramp Rate","loop":""}}.',
    );
  });

  it('names an entry that is no step instead of blaming a step for it', () => {
    expect(() => parseThermoCyclerProtocol(WITH_UNKNOWN_ENTRY)).toThrow(
      'Protokolleintrag ist kein Schritt: comment.',
    );
  });
});

const LOOP_NOTATIONS: Array<
  [string, LoopBoundary | undefined, number | undefined, number | undefined]
> = [
  ['', undefined, undefined, undefined],
  ['Ramp Rate 4.4', undefined, undefined, 4.4],
  ['Slope 20', undefined, undefined, 20],
  ['Slope 0.1', undefined, undefined, 0.1],
  ['\\', 'opens', undefined, undefined],
  ['\\ Ramp Rate 4.4', 'opens', undefined, 4.4],
  ['\\ Slope 20', 'opens', undefined, 20],
  ['/', 'closes', undefined, undefined],
  ['//', 'closes', undefined, undefined],
  ['/ Ramp Rate 2.2', 'closes', undefined, 2.2],
  ['&nbsp;45x', undefined, 45, undefined],
  ['&nbsp;x 45', undefined, 45, undefined],
  ['&nbsp;45x Ramp Rate 2.2', undefined, 45, 2.2],
  ['35x', undefined, 35, undefined],
  ['Slope 20 45x', undefined, 45, 20],
  ['/ Slope 2 41x', 'closes', 41, 2],
  ['//&nbsp;40x', 'closes', 40, undefined],
];

describe('parseLoop', () => {
  it.each(LOOP_NOTATIONS)(
    'reads the notation %p',
    (loop, boundary, repeats, rampRate) => {
      expect(parseLoop(loop)).toStrictEqual({ boundary, repeats, rampRate });
    },
  );
});

const HOLD_NOTATIONS: Array<[string, ThermoCyclerHold]> = [
  ['600 sec', { seconds: 600 }],
  ['30sec', { seconds: 30 }],
  ['10 min', { seconds: 600 }],
  ['1min', { seconds: 60 }],
  ['Cool', { indefinite: true }],
  ['forever', { indefinite: true }],
];

const UNREADABLE_HOLDS: Array<string> = ['', '3min30sec', '2 hours', 'sec'];

describe('parseHold', () => {
  it.each(HOLD_NOTATIONS)('reads the notation %p', (hold, expected) => {
    expect(parseHold(hold)).toStrictEqual(expected);
  });

  it.each(UNREADABLE_HOLDS)('refuses the notation %p', (hold) => {
    expect(() => parseHold(hold)).toThrow(
      UndisplayableThermoCyclerProtocolError,
    );
  });
});
