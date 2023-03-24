import { Spin } from 'antd';
import React, { Fragment } from 'react';

import { MllSpinnerIcon } from '../Spinner';

import { RowLabel } from './RowLabel';
import { Well } from './Well';
import { COORDINATES_COLUMNS, PLATE_FLOW, WELLS } from './constants';
import { PlateProps } from './types';
import {
  assertUniquePositions,
  columnForPosition,
  wellAtPosition,
} from './utils';

export * from './constants';
export * from './types';
export * from './utils';

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
