import { Spin } from 'antd';
import { range } from 'lodash';
import React, { Fragment } from 'react';

import { MllSpinnerIcon } from '../Spinner';
import { PALETTE } from '../theme';

import { Coordinates, FlowDirection, PlateProps, PlateWell } from './types';
import {
  assertUniquePositions,
  columnForPosition,
  rowForPosition,
  wellAtPosition,
} from './utils';

export * from './types';
export * from './utils';

const TUBE_COUNT = 96;
export const WELLS = range(1, TUBE_COUNT + 1);
export const COORDINATES_COLUMNS: Array<Coordinates['column']> = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];
export const COORDINATES_ROWS: Array<Coordinates['row']> = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
];

const PLATE_FLOW: FlowDirection = 'row';

export function Plate(props: PlateProps) {
  if (props.data) {
    assertUniquePositions(props.data);
  }

  return (
    <Spin
      spinning={props.loading ?? false}
      indicator={
        <MllSpinnerIcon
          style={{
            width: '2em',
          }}
        />
      }
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `1fr ${'4fr '.repeat(
            COORDINATES_COLUMNS.length,
          )}`,
          gridGap: '3px',
        }}
      >
        <span />

        {COORDINATES_COLUMNS.map((column) => (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 4,
            }}
            key={column}
          >
            <strong>{column}</strong>
          </span>
        ))}

        {WELLS.map((position) => (
          <Fragment key={position}>
            {columnForPosition(position, PLATE_FLOW) === 1 && (
              <RowLabel position={position} />
            )}

            <Well
              position={position}
              well={
                props.data
                  ? wellAtPosition(position, props.data, PLATE_FLOW)
                  : undefined
              }
            />
          </Fragment>
        ))}
      </div>
    </Spin>
  );
}

function Well(props: { position: number; well?: PlateWell }) {
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
        {props.well?.content}
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

function RowLabel(props: { position: number }) {
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
