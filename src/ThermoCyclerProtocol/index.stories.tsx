import React, { ReactElement } from 'react';

import { ThermoCyclerProtocolProfile } from './ThermoCyclerProtocolProfile';
import { ANNEALING_58, WITHOUT_CYCLE_COUNT } from './exampleProtocols';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';

const PROTOCOL = parseThermoCyclerProtocol(ANNEALING_58);
const PROTOCOL_WITHOUT_CYCLE_COUNT =
  parseThermoCyclerProtocol(WITHOUT_CYCLE_COUNT);

export default {
  title: 'ThermoCyclerProtocol',
};

/** The run as a schematic staircase, hold time and ramp rate under each step. */
export function Profile(): ReactElement {
  return <ThermoCyclerProtocolProfile protocol={PROTOCOL} />;
}

/** The same run as stored before its cycle count was filled in. */
export function ProfileWithoutCycleCount(): ReactElement {
  return (
    <ThermoCyclerProtocolProfile protocol={PROTOCOL_WITHOUT_CYCLE_COUNT} />
  );
}
