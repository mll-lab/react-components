import React, { ReactElement } from 'react';

import { Select } from '../Select';

import { TecanWorklist } from './TecanWorklist';

/**
 * The tip count is what shapes the worklist, so that is what the user picks.
 * Which device serves a tip count is the consumer's business.
 */
export type TecanTipCountOption<TDevice extends string> = {
  tipCount: number;
  /** Device the worklist is requested for, opaque to this component. */
  device: TDevice;
};

export type TecanWorklistPreviewProps<TDevice extends string> = {
  /** Worklist generated for the selected device. */
  gwl: string;
  device: TDevice;
  tipCountOptions: Array<TecanTipCountOption<TDevice>>;
  onDeviceChange: (device: TDevice) => void;
};

/**
 * Previews the worklist a run would produce, for a tip count the user picks.
 * For a worklist that already exists, render TecanWorklist directly.
 *
 * Exists so the label wording and the placement of the tip count control are
 * decided once here, rather than in every app that offers such a preview.
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
          options={tipCountOptions.map((option) => ({
            label: `${option.tipCount} Tip`,
            value: option.device,
          }))}
          value={device}
          // Wrapped because Select also passes the option, which is none of the consumer's business.
          onChange={(selected) => onDeviceChange(selected)}
        />
      }
    />
  );
}
