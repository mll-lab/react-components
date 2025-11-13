import * as React from 'react';

import { PALETTE } from '../theme';

export function EmptyLabware({ shortLabel }: { shortLabel: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px dashed ${PALETTE.gray3}`,
        borderRadius: '2px',
        padding: '8px 4px',
        backgroundColor: PALETTE.gray1,
        opacity: 0.6,
        fontSize: '9px',
        fontWeight: 500,
        color: PALETTE.gray6,
        whiteSpace: 'nowrap',
      }}
    >
      {shortLabel}
    </div>
  );
}
