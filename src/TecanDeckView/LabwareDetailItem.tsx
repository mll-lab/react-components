import * as React from 'react';

import { PALETTE } from '../theme';

/* eslint-disable-next-line @mll-lab/no-color-literals -- Hardware-specific color must match physical label appearance */
const LABEL_BACKGROUND_COLOR = '#e0e559';

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
  shortLabel,
}: {
  shortLabel: string;
  content: React.ReactElement;
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
      {content}
      <div style={LABEL_STYLE}>{shortLabel}</div>
    </div>
  );
}
