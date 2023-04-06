import { uniq } from 'lodash';

import { COORDINATES_COLUMNS, COORDINATES_ROWS } from './constants';
import { Coordinates, FlowDirection, PlateWell } from './types';

export function rowForPosition(
  position: number,
  flowDirection: FlowDirection,
): Coordinates['row'] {
  switch (flowDirection) {
    case 'row':
      return COORDINATES_ROWS[
        Math.floor((position - 1) / COORDINATES_COLUMNS.length)
      ]!;
    case 'column':
      return COORDINATES_ROWS[(position - 1) % COORDINATES_ROWS.length]!;
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
      return COORDINATES_COLUMNS[(position - 1) % COORDINATES_COLUMNS.length]!;
    case 'column':
      return COORDINATES_COLUMNS[
        Math.floor((position - 1) / COORDINATES_ROWS.length)
      ]!;
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
  const rowIndex = COORDINATES_ROWS.indexOf(coordinates.row);
  const columnIndex = COORDINATES_COLUMNS.indexOf(coordinates.column);

  switch (flowDirection) {
    case 'row':
      return rowIndex * COORDINATES_COLUMNS.length + columnIndex + 1;
    case 'column':
      return columnIndex * COORDINATES_ROWS.length + rowIndex + 1;
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

export function areEqualCoordinates<
  A extends Coordinates,
  B extends Coordinates,
>(a: A, b: B): boolean {
  return a.row === b.row && a.column === b.column;
}

export function ensureCoordinatesInRange<
  T extends {
    row: string;
    column: number;
  },
>(coordinates: T): T & Coordinates {
  if (!COORDINATES_ROWS.includes(coordinates.row as Coordinates['row'])) {
    throw new Error(
      `The given coordinates row ${coordinates.row} is not in range A-H.`,
    );
  }

  if (
    !COORDINATES_COLUMNS.includes(coordinates.column as Coordinates['column'])
  ) {
    throw new Error(
      `The given coordinates column ${coordinates.column} is not in range 1-12.`,
    );
  }

  return coordinates as T & Coordinates;
}

export function assertUniquePositions(data: Array<PlateWell>): void {
  const positions = data.map(
    (well) => `${well.coordinates.row}${well.coordinates.column}`,
  );

  if (uniq(positions).length !== data.length) {
    throw new Error(
      'Property "data" contains records with non-unique positions.',
    );
  }
}
