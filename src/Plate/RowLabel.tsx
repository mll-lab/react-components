import React from 'react';

import { PLATE_FLOW } from './constants';
import { rowForPosition } from './utils';

export function RowLabel(props: { position: number }) {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <strong>{rowForPosition(props.position, PLATE_FLOW)}</strong>
    </span>
  );
}
