import React, { ReactElement } from 'react';

import { TecanWorklist } from './TecanWorklist';
import { TecanWorklistPreview } from './TecanWorklistPreview';
import { DILUTION_RUN_WORKLIST } from './exampleWorklist';

const TIP_COUNT_OPTIONS = [
  { tipCount: 4, device: 'A' },
  { tipCount: 8, device: 'E' },
];

export default {
  title: 'TecanWorklist',
};

export function Worklist(): ReactElement {
  return <TecanWorklist gwl={DILUTION_RUN_WORKLIST} />;
}

export function WorklistOfKnownDevice(): ReactElement {
  return (
    <TecanWorklist gwl={DILUTION_RUN_WORKLIST} toolbar={<span>Tecan C</span>} />
  );
}

export function Preview(): ReactElement {
  const [device, setDevice] = React.useState('A');

  return (
    <TecanWorklistPreview
      gwl={DILUTION_RUN_WORKLIST}
      device={device}
      tipCountOptions={TIP_COUNT_OPTIONS}
      onDeviceChange={setDevice}
    />
  );
}
