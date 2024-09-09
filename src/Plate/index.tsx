import { DndContext } from '@dnd-kit/core';
import { Spin } from 'antd';
import React, { Fragment } from 'react';

import { MllSpinnerIcon } from '../Spinner';

import { RowLabel } from './RowLabel';
import { Well } from './Well';
import { PLATE_FLOW } from './constants';
import { CoordinateSystem, PlateProps } from './types';
import {
  allCoordinateSystemPositions,
  assertUniquePositions,
  columnForPosition,
  wellAtPosition,
} from './utils';

export * from './constants';
export * from './coordinateSystem96Well';
export * from './types';
export * from './utils';
export { GENERAL_WELL_STYLE } from './wellUtils';

export function Plate<TCoordinateSystem extends CoordinateSystem>(
  props: PlateProps<TCoordinateSystem>,
) {
  if (props.data) {
    assertUniquePositions(props.data);
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
              props.coordinateSystem.columns.length,
            )}`,
            gridGap: '3px',
          }}
        >
          <span />

          {props.coordinateSystem.columns.map((column) => (
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

          {allCoordinateSystemPositions(props.coordinateSystem).map(
            (position) => (
              <Fragment key={position}>
                {columnForPosition(
                  position,
                  PLATE_FLOW,
                  props.coordinateSystem,
                ) === 1 && (
                  <RowLabel
                    position={position}
                    coordinateSystem={props.coordinateSystem}
                  />
                )}

                <Well
                  position={position}
                  coordinateSystem={props.coordinateSystem}
                  well={
                    props.data
                      ? wellAtPosition(
                          position,
                          props.data,
                          PLATE_FLOW,
                          props.coordinateSystem,
                        )
                      : null
                  }
                  isDraggable={props.isDraggable ?? false}
                />
              </Fragment>
            ),
          )}
        </div>
      </Spin>
    </DndContext>
  );
}
