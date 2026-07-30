import React from 'react';

import { pipettingLossTableColumn } from './pipettingLossTableColumn';
import { MasterMixTableRow, PipettingLossTableColumnArgs } from './types';

// Fixed widths keep the columns of the master mix and the reaction table aligned.
const VOLUME_COLUMN_WIDTH = '80px';
const PIPETTING_LOSS_COLUMN_WIDTH = '150px';

export function volumeColumns(args: PipettingLossTableColumnArgs) {
  return [
    {
      title: 'Name',
      render: (_: unknown, record: MasterMixTableRow) => record.title,
    },
    {
      title: '1x',
      width: VOLUME_COLUMN_WIDTH,
      render: (_: unknown, record: MasterMixTableRow) => (
        <>{record.volume.toFixed(1)} µl</>
      ),
    },
    {
      ...pipettingLossTableColumn(args),
      width: PIPETTING_LOSS_COLUMN_WIDTH,
    },
  ];
}
