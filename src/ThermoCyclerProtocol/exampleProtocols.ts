/**
 * Obfuscated protocols in the exact character format of the source column.
 * `String.raw` keeps the two literal backslashes the column carries at the loop markers,
 * which `JSON.parse` then reads as the single backslash that opens a loop.
 */

export const ANNEALING_58 = {
  name: 'ExampleAssay_LC480_58C',
  protocol: String.raw`{"0":{"Tp":95,"t":"600 sec","loop":"Ramp Rate 4.4"},"1":{"Tp":95,"t":"10 sec","loop":"\\ Ramp Rate 4.4"},"2":{"Tp":58,"t":"30 sec","loop":"&nbsp;45x Ramp Rate 2.2"},"3":{"Tp":72,"t":"30 sec","loop":"/ Ramp Rate 4.4"},"4":{"Tp":40,"t":"Cool","loop":"Ramp Rate 2.2"}}`,
};

export const ANNEALING_60 = {
  name: 'ExampleAssay_LC480_60C',
  protocol: String.raw`{"0":{"Tp":95,"t":"600 sec","loop":"Ramp Rate 4.4"},"1":{"Tp":95,"t":"10 sec","loop":"\\ Ramp Rate 4.4"},"2":{"Tp":60,"t":"30 sec","loop":"&nbsp;45x Ramp Rate 2.2"},"3":{"Tp":72,"t":"30 sec","loop":"/ Ramp Rate 4.4"},"4":{"Tp":40,"t":"Cool","loop":"Ramp Rate 2.2"}}`,
};

/** `ANNEALING_58` as the data looks before the cycle count is corrected. */
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
