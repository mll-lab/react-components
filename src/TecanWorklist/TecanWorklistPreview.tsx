import React, { ReactElement } from 'react';

import { Select } from '../Select';

import { TecanWorklist } from './TecanWorklist';

/**
 * The tip count is what shapes the worklist, so that is what the user picks.
 * Which device serves a tip count is the consumer's business.
 */
export type TipCountOption<TDevice extends string> = {
  tipCount: number;
  /** Device the worklist is requested for, opaque to this component. */
  value: TDevice;
};

export type TecanWorklistPreviewProps<TDevice extends string> = {
  /** Worklist generated for the selected device. */
  gwl: string;
  device: TDevice;
  tipCountOptions: Array<TipCountOption<TDevice>>;
  onDeviceChange: (device: TDevice) => void;
};

/**
 * Previews the worklist a run would produce, for a tip count the user picks.
 * For a worklist that already exists, render TecanWorklist directly.
 */
export function TecanWorklistPreview<TDevice extends string>({
  gwl,
  device,
  tipCountOptions,
  onDeviceChange,
}: TecanWorklistPreviewProps<TDevice>): ReactElement {
  return (
    <TecanWorklist
      gwl={gwl}
      toolbar={
        <Select<TDevice>
          size="small"
          options={tipCountOptions.map(({ tipCount, value }) => ({
            label: `${tipCount} Tip`,
            value,
          }))}
          value={device}
          onChange={onDeviceChange}
        />
      }
    />
  );
}
