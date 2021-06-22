import { range, uniq } from 'lodash';
import React, { ReactNode } from 'react';

import { MLL_THEME } from '../theme';

export type Coordinates = {
  row: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  column: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export type PlateWell = {
  coordinates: Coordinates;
  content?: ReactNode;
  selected?: boolean;
};

export type PlateProps = {
  data: Array<PlateWell>;
};

const TUBE_COUNT = 96;
const WELLS = range(1, TUBE_COUNT + 1);
const COLUMNS: Array<Coordinates['column']> = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
];
const ROWS: Array<Coordinates['row']> = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
];

type FlowDirection = 'row' | 'column';

export function rowForPosition(
  position: number,
  flowDirection: FlowDirection,
): Coordinates['row'] {
  switch (flowDirection) {
    case 'row':
      return ROWS[Math.floor((position - 1) / COLUMNS.length)];
    case 'column':
      return ROWS[(position - 1) % ROWS.length];
    default:
      throw new Error(`Unknown flow direction: ${flowDirection}`);
  }
}

export function columnForPosition(
  position: number,
  flowDirection: FlowDirection,
): Coordinates['column'] {
  switch (flowDirection) {
    case 'row':
      return COLUMNS[(position - 1) % COLUMNS.length];
    case 'column':
      return COLUMNS[Math.floor((position - 1) / ROWS.length)];
    default:
      throw new Error(`Unknown flow direction: ${flowDirection}`);
  }
}

export function coordinatesForPosition(
  position: number,
  flowDirection: FlowDirection,
): Coordinates {
  return {
    row: rowForPosition(position, flowDirection),
    column: columnForPosition(position, flowDirection),
  };
}

export function positionForCoordinates(
  coordinates: Coordinates,
  flowDirection: FlowDirection,
): number {
  const rowIndex = ROWS.indexOf(coordinates.row);
  const columnIndex = COLUMNS.indexOf(coordinates.column);

  switch (flowDirection) {
    case 'row':
      return rowIndex * COLUMNS.length + columnIndex + 1;
    case 'column':
      return columnIndex * ROWS.length + rowIndex + 1;
    default:
      throw new Error(`Unknown flow direction: ${flowDirection}`);
  }
}

export function wellAtPosition(
  position: number,
  data: Array<PlateWell>,
  flowDirection: FlowDirection,
): PlateWell | undefined {
  return data.find(
    (well) =>
      well.coordinates.row === rowForPosition(position, flowDirection) &&
      well.coordinates.column === columnForPosition(position, flowDirection),
  );
}

export function convertPositionFromColumnToRowFlow(position: number): number {
  const coordinates = coordinatesForPosition(position, 'column');

  return positionForCoordinates(coordinates, 'row');
}

export function convertPositionFromRowToColumnFlow(position: number): number {
  const coordinates = coordinatesForPosition(position, 'row');

  return positionForCoordinates(coordinates, 'column');
}

const LINE_STYLE = {
  padding: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function assertUniquePositions(data: Array<PlateWell>): void {
  const positions = data.map(
    (well) => `${well.coordinates.row}${well.coordinates.column}`,
  );

  if (uniq(positions).length !== data.length) {
    throw new Error(
      'Property "data" contains records with non-unique positions.',
    );
  }
}

const PLATE_FLOW: FlowDirection = 'row';

export function Plate(props: PlateProps) {
  assertUniquePositions(props.data);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `1fr ${'4fr '.repeat(COLUMNS.length)}`,
        gridGap: '3px',
      }}
    >
      <span style={LINE_STYLE} />

      {COLUMNS.map((column) => (
        <span style={LINE_STYLE} key={column}>
          <strong>{column}</strong>
        </span>
      ))}

      {WELLS.map((position) => (
        <>
          {columnForPosition(position, PLATE_FLOW) === 1 && (
            <RowLabel position={position} />
          )}

          <Well
            key={position}
            position={position}
            well={wellAtPosition(position, props.data, PLATE_FLOW)}
          />
        </>
      ))}
    </div>
  );
}

function Well(props: { position: number; well?: PlateWell }) {
  return (
    <span
      style={{
        backgroundColor: props.well?.selected
          ? MLL_THEME.warningColor
          : MLL_THEME.tableBorderColor,
        border: '1px solid lightgrey',
        borderRadius: 2,
        boxShadow: '0 0.5px 1.5px lightgrey',
        ...LINE_STYLE,
      }}
    >
      {props.well?.content ?? (
        <small style={{ color: MLL_THEME.menuGroupBackgroundColor }}>
          {rowForPosition(props.position, PLATE_FLOW) +
            columnForPosition(props.position, PLATE_FLOW)}
        </small>
      )}
    </span>
  );
}

function RowLabel(props: { position: number }) {
  return (
    <span style={LINE_STYLE}>
      <strong>{rowForPosition(props.position, PLATE_FLOW)}</strong>
    </span>
  );
}
