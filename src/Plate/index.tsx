import { DndContext } from '@dnd-kit/core';
import { Spin } from 'antd';
import React, { Fragment } from 'react';

import { MllSpinnerIcon } from '../Spinner';

import { RowLabel } from './RowLabel';
import { Well } from './Well';
import { COORDINATES_COLUMNS, PLATE_FLOW, WELLS } from './constants';
import { PlateProps } from './types';
import { CoordinateSystem } from './coordinateSystem';
import { PlateProps, PlateWell } from './types';
import {
  assertDataCoordinatesAreInCoordinateSystem,
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
    assertDataCoordinatesAreInCoordinateSystem(props);
  }

  return (
    <DndContext {...props.dndContextProps}>
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
                position={position}
                well={
                  props.data
                    ? props.coordinateSystem.wellAtPosition(position, props.data)
                    : undefined
                }
                isDraggable={props.isDraggable ?? false}
              />
            </Fragment>
          ))}
        </div>
      </Spin>
    </DndContext>
  );
}
export { GENERAL_WELL_STYLE } from './wellUtils';
