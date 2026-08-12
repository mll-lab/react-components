/**
 * Obfuscated protocols in the exact character format of the source column.
 * `String.raw` keeps the two literal backslashes the column carries at the loop markers,
 * which `JSON.parse` then reads as the single backslash that opens a loop.
 */

export const ANNEALING_58 = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":95,"t":"600 sec","loop":"Ramp Rate 4.4"},"1":{"Tp":95,"t":"10 sec","loop":"\\ Ramp Rate 4.4"},"2":{"Tp":58,"t":"30 sec","loop":"&nbsp;45x Ramp Rate 2.2"},"3":{"Tp":72,"t":"30 sec","loop":"/ Ramp Rate 4.4"},"4":{"Tp":40,"t":"Cool","loop":"Ramp Rate 2.2"}}`,
};

/** `ANNEALING_58` with a loop whose cycle count no step of it carries. */
export const WITHOUT_CYCLE_COUNT = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":95,"t":"600 sec","loop":"Ramp Rate 4.4"},"1":{"Tp":95,"t":"10 sec","loop":"\\ Ramp Rate 4.4"},"2":{"Tp":58,"t":"30 sec","loop":"Ramp Rate 2.2"},"3":{"Tp":72,"t":"30 sec","loop":"/ Ramp Rate 4.4"},"4":{"Tp":40,"t":"Cool","loop":"Ramp Rate 2.2"}}`,
};

/**
 * A protocol from the same column that misses the canonical format twice: it writes the ramp rate
 * as `4.4&deg;C/s`, and its second loop pair is a melting curve — a slow continuous ramp with no
 * cycle count, which the type deliberately does not model.
 */
export const MELTING_CURVE = {
  name: 'ExampleMeltingCurve_480',
  protocol: String.raw`{"0":{"Tp":95,"t":"10 min","loop":"4.4&deg;C/s"},"1":{"Tp":95,"t":"10 sec","loop":"\\ 4.4&deg;C/s"},"2":{"Tp":60,"t":"30 sec","loop":"&nbsp;45x 2.2&deg;C/s"},"3":{"Tp":72,"t":"30 sec","loop":"/ 4.4&deg;C/s"},"4":{"Tp":95,"t":"1 min","loop":"\\ 4.4&deg;C/s"},"5":{"Tp":40,"t":"1 min","loop":"2.2&deg;C/s"},"6":{"Tp":75,"t":"","loop":"/ 0.11&deg;C/s"},"7":{"Tp":40,"t":"30 sec","loop":"2.2&deg;C/s"}}`,
};

/** `MELTING_CURVE` with canonical ramp rates, so only its second loop pair still misses the format. */
export const MELTING_CURVE_WITH_CANONICAL_RAMP_RATES = {
  name: 'ExampleMeltingCurve_480',
  protocol: String.raw`{"0":{"Tp":95,"t":"10 min","loop":"Ramp Rate 4.4"},"1":{"Tp":95,"t":"10 sec","loop":"\\ Ramp Rate 4.4"},"2":{"Tp":60,"t":"30 sec","loop":"&nbsp;45x Ramp Rate 2.2"},"3":{"Tp":72,"t":"30 sec","loop":"/ Ramp Rate 4.4"},"4":{"Tp":95,"t":"1 min","loop":"\\ Ramp Rate 4.4"},"5":{"Tp":40,"t":"1 min","loop":"Ramp Rate 2.2"},"6":{"Tp":75,"t":"","loop":"/ Ramp Rate 0.11"},"7":{"Tp":40,"t":"30 sec","loop":"Ramp Rate 2.2"}}`,
};

/** The column is plain text, so it also holds strings that were never complete JSON. */
export const TRUNCATED = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":95,"t":"600 sec","loop":"Ramp Rate 4.4"}`,
};

/**
 * A block cycler has one ramp rate for the whole protocol instead of one per step, writes its loop
 * markers without an annotation behind them, and ends on a hold that runs until someone opens the lid.
 */
export const PROTOCOL_RAMP_RATE = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":94,"t":"5 min","loop":""},"1":{"Tp":95,"t":"45 sec","loop":"\\"},"2":{"Tp":58,"t":"45 sec","loop":"&nbsp;35x"},"3":{"Tp":72,"t":"45 sec","loop":"/"},"4":{"Tp":12,"t":"forever","loop":""},"rampRate":{"Temp":"3","name":"Temperature Ramp Rate","loop":""}}`,
};

/** The cycle count can sit behind the annotation, on the marker that closes the loop. */
export const COUNT_AT_LOOP_CLOSE = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":95,"t":"10 min","loop":"Slope 20"},"1":{"Tp":95,"t":"1 sec","loop":"\\ Slope 20"},"2":{"Tp":58,"t":"10 sec","loop":"Slope 20"},"3":{"Tp":72,"t":"10 sec","loop":"/ Slope 2 41x"},"4":{"Tp":40,"t":"Cool","loop":"Slope 20"}}`,
};

/** An export that never bracketed its loop repeats the cycle count on every step of it. */
export const IMPLICIT_LOOP = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":95,"t":"15 min","loop":""},"1":{"Tp":95,"t":"60 sec","loop":"&nbsp;35x"},"2":{"Tp":58,"t":"60 sec","loop":"&nbsp;35x"},"3":{"Tp":72,"t":"150 sec","loop":"&nbsp;35x"},"4":{"Tp":72,"t":"10 min","loop":""}}`,
};

/** A protocol whose only entry is the ramp rate has no step to draw. */
export const WITHOUT_STEPS = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"rampRate":{"Temp":"3","name":"Temperature Ramp Rate","loop":""}}`,
};

/** Only the protocol ramp rate is a known entry beside the step indices, so anything else is refused. */
export const WITH_UNKNOWN_ENTRY = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":95,"t":"600 sec","loop":"Ramp Rate 4.4"},"comment":{"Temp":"3","name":"Temperature Ramp Rate","loop":""}}`,
};

/** Two openers without a close between them, otherwise well-formed — flattening would not error. */
export const NESTED_LOOPS = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":95,"t":"10 sec","loop":"\\ Ramp Rate 4.4"},"1":{"Tp":58,"t":"30 sec","loop":"\\ Ramp Rate 2.2"},"2":{"Tp":72,"t":"30 sec","loop":"&nbsp;45x Ramp Rate 4.4"},"3":{"Tp":40,"t":"Cool","loop":"/ Ramp Rate 2.2"}}`,
};
