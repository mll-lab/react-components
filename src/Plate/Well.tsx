import React from 'react';

import { PALETTE } from '../theme';

import { PLATE_FLOW } from './constants';
import { PlateWell } from './types';
import { columnForPosition, rowForPosition } from './utils';

export function Well(props: { position: number; well?: PlateWell }) {
  const generalWellStyle = {
    backgroundColor: props.well?.color ?? PALETTE.gray3,
    border: `1px solid ${PALETTE.gray4}`,
    borderRadius: 2,
    boxShadow: `0 0.5px 1.5px ${PALETTE.gray4}`,
    padding: 4,
  };

  if (props.well?.content) {
    return (
      <span
        style={{
          ...generalWellStyle,
        }}
      >
        {props.well.content}
      </span>
    );
  }

  return (
    <small
      style={{
        color: PALETTE.gray1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...generalWellStyle,
      }}
    >
      {rowForPosition(props.position, PLATE_FLOW) +
        columnForPosition(props.position, PLATE_FLOW)}
    </small>
  );
}
