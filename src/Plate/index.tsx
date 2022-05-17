import { Spin } from 'antd';
import React, { Fragment } from 'react';

import { MllSpinnerIcon } from '../Spinner';
import { PALETTE } from '../theme';

import { CoordinateSystem } from './coordinateSystem';
import { PlateProps, PlateWell } from './types';
import {
  assertDataCoordinatesAreInCoordinateSystem,
  assertUniquePositions,
} from './utils';

export * from './types';
export * from './utils';

export function Plate(props: PlateProps) {
  if (props.data) {
    assertUniquePositions(props.data);
    assertDataCoordinatesAreInCoordinateSystem(props);
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
            props.coordinateSystem.columnsCount(),
          )}`,
          gridGap: '3px',
        }}
      >
        <span />

        {props.coordinateSystem.columns().map((column) => (
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

        {props.coordinateSystem.all().map((position) => (
          <Fragment key={position}>
            {props.coordinateSystem.columnForRowFlowPosition(position) ===
              1 && (
              <RowLabel
                row={props.coordinateSystem.rowForRowFlowPosition(position)}
              />
            )}

            <Well
              coordinateSystem={props.coordinateSystem}
              position={position}
              well={
                props.data
                  ? props.coordinateSystem.wellAtPosition(position, props.data)
                  : undefined
              }
            />
          </Fragment>
        ))}
      </div>
    </Spin>
  );
}

function Well(props: {
  coordinateSystem: CoordinateSystem;
  position: number;
  well?: PlateWell;
}) {
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
      {props.coordinateSystem.rowForRowFlowPosition(props.position) +
        props.coordinateSystem.columnForRowFlowPosition(props.position)}
    </small>
  );
}

function RowLabel(props: { row: string }) {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <strong>{props.row}</strong>
    </span>
  );
}
