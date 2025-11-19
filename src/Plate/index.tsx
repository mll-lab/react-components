import { DndContext } from '@dnd-kit/core';
import { Spin } from 'antd';
import React, { Fragment } from 'react';

import { MllSpinnerIcon } from '../Spinner';

import { ColumnLabel } from './ColumnLabel';
import { RowLabel } from './RowLabel';
import { Well } from './Well';
import {
  GRID_GAP,
  PLATE_FLOW,
  ROW_LABEL_WIDTH,
  WELL_COLUMN_WIDTH_COMPACT,
  WELL_COLUMN_WIDTH_UNIFORM,
} from './constants';
import { CoordinateSystem, PlateProps } from './types';
import {
  allCoordinateSystemPositions,
  assertUniquePositions,
  columnForPosition,
  rowForPosition,
  wellAtPosition,
} from './utils';

export * from './constants';
export * from './coordinateSystem12x8';
export * from './coordinateSystem2x16';
export * from './coordinateSystem6x4';
export * from './types';
export * from './utils';
export { GENERAL_WELL_STYLE } from './wellUtils';

export function Plate<TCoordinateSystem extends CoordinateSystem>({
  coordinateSystem,
  data,
  dndContextProps,
  isDraggable,
  loading,
  wellSizing = 'uniform',
}: PlateProps<TCoordinateSystem>) {
  if (data) {
    assertUniquePositions(data);
  }

  return (
    <DndContext {...dndContextProps}>
      <Spin
        spinning={loading ?? false}
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
            gridTemplateColumns: `${ROW_LABEL_WIDTH} repeat(${
              coordinateSystem.columns.length
            }, ${
              wellSizing === 'compact'
                ? WELL_COLUMN_WIDTH_COMPACT
                : WELL_COLUMN_WIDTH_UNIFORM
            })`,
            gridGap: GRID_GAP,
          }}
        >
          {/* takes up the space in the upper left corner between A and 1 */}
          <span />

          {coordinateSystem.columns.map((column) => (
            <ColumnLabel key={column} column={column} />
          ))}

          {allCoordinateSystemPositions(coordinateSystem).map((position) => (
            <Fragment key={position}>
              {columnForPosition(position, PLATE_FLOW, coordinateSystem) ===
                1 && (
                <RowLabel
                  row={rowForPosition(position, PLATE_FLOW, coordinateSystem)}
                />
              )}

              <Well
                position={position}
                coordinateSystem={coordinateSystem}
                well={
                  data
                    ? wellAtPosition(
                        position,
                        data,
                        PLATE_FLOW,
                        coordinateSystem,
                      )
                    : null
                }
                isDraggable={isDraggable ?? false}
              />
            </Fragment>
          ))}
        </div>
      </Spin>
    </DndContext>
  );
}
