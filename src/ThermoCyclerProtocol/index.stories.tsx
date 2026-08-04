import React, { ReactElement } from 'react';

import { ThermoCyclerProtocolProfile } from './ThermoCyclerProtocolProfile';
import { ANNEALING_58, ANNEALING_60 } from './exampleProtocols';
import { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';

const PROTOCOLS = {
  [ANNEALING_58.name]: parseThermoCyclerProtocol(ANNEALING_58),
  [ANNEALING_60.name]: parseThermoCyclerProtocol(ANNEALING_60),
};

type StoryProps = {
  protocolName: keyof typeof PROTOCOLS;
  source: string;
};

export default {
  title: 'ThermoCyclerProtocol',
  args: {
    protocolName: ANNEALING_58.name,
    source: 'NeMo',
  },
  argTypes: {
    /** The two protocols differ only in their annealing temperature — switch to compare 58 against 60. */
    protocolName: {
      control: 'radio',
      options: Object.keys(PROTOCOLS),
    },
    source: { control: 'text' },
  },
};

function protocolFor(protocolName: StoryProps['protocolName']) {
  return PROTOCOLS[protocolName] ?? PROTOCOLS[ANNEALING_58.name];
}

/** The run as a schematic staircase, hold time and ramp rate under each step. */
export function Profile({ protocolName, source }: StoryProps): ReactElement {
  return (
    <ThermoCyclerProtocolProfile
      protocol={protocolFor(protocolName)}
      source={source}
    />
  );
}
