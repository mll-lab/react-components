import React, { ReactElement } from 'react';

import { ThermoCyclerProtocolProfile } from './ThermoCyclerProtocolProfile';
import { ANNEALING_58, ANNEALING_60 } from './exampleProtocols';
import { findAnnealing } from './findAnnealing';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';

const PROTOCOL_58 = parseThermoCyclerProtocol(ANNEALING_58);
const PROTOCOL_60 = parseThermoCyclerProtocol(ANNEALING_60);

const PROTOCOLS = {
  [ANNEALING_58.name]: {
    protocol: PROTOCOL_58,
    annealing: findAnnealing(PROTOCOL_58),
  },
  [ANNEALING_60.name]: {
    protocol: PROTOCOL_60,
    annealing: findAnnealing(PROTOCOL_60),
  },
};

type StoryProps = {
  protocolName: keyof typeof PROTOCOLS;
};

export default {
  title: 'ThermoCyclerProtocol',
  args: {
    protocolName: ANNEALING_58.name,
  },
  argTypes: {
    /** The two protocols differ only in their annealing temperature — switch to compare 58 against 60. */
    protocolName: {
      control: 'radio',
      options: Object.keys(PROTOCOLS),
    },
  },
};

function protocolFor(protocolName: StoryProps['protocolName']) {
  return PROTOCOLS[protocolName] ?? PROTOCOLS[ANNEALING_58.name];
}

/** The run as a schematic staircase, hold time and ramp rate under each step. */
export function Profile({ protocolName }: StoryProps): ReactElement {
  return <ThermoCyclerProtocolProfile {...protocolFor(protocolName)} />;
}
