import React, { ReactElement } from 'react';

import { ThermoCyclerProtocolProfile } from './ThermoCyclerProtocolProfile';
import { ANNEALING_58 } from './exampleProtocols';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';

const PROTOCOL = parseThermoCyclerProtocol(ANNEALING_58);

export default {
  title: 'ThermoCyclerProtocol',
};

/** The run as a schematic staircase, hold time and ramp rate under each step. */
export function Profile(): ReactElement {
  return <ThermoCyclerProtocolProfile protocol={PROTOCOL} />;
}
