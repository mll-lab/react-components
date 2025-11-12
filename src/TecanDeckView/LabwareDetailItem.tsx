import * as React from 'react';

import { PALETTE } from '../theme';

/* eslint-disable @mll-lab/no-color-literals */
const LABEL_BACKGROUND_COLOR = '#e0e559';
/* eslint-enable @mll-lab/no-color-literals */

const LABEL_STYLE = {
  backgroundColor: LABEL_BACKGROUND_COLOR,
  padding: '2px 6px',
  fontSize: '11px',
  fontWeight: 600,
  color: PALETTE.black,
  whiteSpace: 'nowrap',
  alignSelf: 'flex-start',
} as const;

const CONTAINER_STYLE = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: '4px',
  padding: '4px',
} as const;

export function LabwareDetailItem({
  backgroundColor = PALETTE.white,
  content,
  scaleFactor,
  shortLabel,
}: {
  shortLabel: string;
  content: React.ReactElement;
  scaleFactor: number;
  backgroundColor?: string;
}) {
  return (
    <div
      style={{
        ...CONTAINER_STYLE,
        backgroundColor,
        border: `1px solid ${PALETTE.gray4}`,
        boxShadow: `0 2px 4px ${PALETTE.black}1a`,
      }}
    >
      <div style={{ zoom: scaleFactor }}>{content}</div>
      <div style={LABEL_STYLE}>{shortLabel}</div>
    </div>
  );
}
