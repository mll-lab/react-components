import React, { ReactElement } from 'react';

import { Select } from '../Select';

import { TecanWorklist } from './TecanWorklist';

/**
 * The tip count is what shapes the worklist, so that is what the user picks.
 * Which device serves a tip count is the consumer's business.
 */
export type TecanTipCountOption<TDevice extends string> = {
  tipCount: number;
  device: TDevice;
};

export type TecanWorklistPreviewProps<TDevice extends string> = {
  /** Worklist generated for the selected device. */
  gwl: string;
  device: TDevice;
  tipCountOptions: Array<TecanTipCountOption<TDevice>>;
  onDeviceChange: (device: TDevice) => void;
};

/** For a worklist that already exists, render TecanWorklist directly. */
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
          options={tipCountOptions.map((option) => ({
            label: `${option.tipCount} Tip`,
            value: option.device,
          }))}
          value={device}
          // Wrapped because Select also passes the option, which the consumer has no use for.
          onChange={(selected) => onDeviceChange(selected)}
        />
      }
    />
  );
}
