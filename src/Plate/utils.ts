import { uniq } from 'lodash';

import { Coordinate } from './coordinate';
import { CoordinateSystem96Well } from './coordinateSystem96Well';
import { Coordinates, FlowDirection, PlateWell } from './types';

export function rowForPosition(
  position: number,
  flowDirection: FlowDirection,
): Coordinates['row'] {
  switch (flowDirection) {
    case 'row':
      return new CoordinateSystem96Well().rowForRowFlowPosition(position);
    case 'column':
      return new CoordinateSystem96Well().rowForColumnFlowPosition(position);
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
      return new CoordinateSystem96Well().columnForRowFlowPosition(position);
    case 'column':
      return new CoordinateSystem96Well().columnForColumnFlowPosition(position);
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
  return Coordinate.fromString(
    coordinates.row + coordinates.column,
    new CoordinateSystem96Well(),
  ).position(flowDirection);
}

export function convertPositionFromColumnToRowFlow(position: number): number {
  return Coordinate.fromPosition(
    position,
    'column',
    new CoordinateSystem96Well(),
  ).position('row');
}

export function convertPositionFromRowToColumnFlow(position: number): number {
  return Coordinate.fromPosition(
    position,
    'row',
    new CoordinateSystem96Well(),
  ).position('column');
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
  if (
    !new CoordinateSystem96Well()
      .rows()
      .includes(coordinates.row as Coordinates['row'])
  ) {
    throw new Error(
      `The given coordinates row ${coordinates.row} is not in range A-H.`,
    );
  }

  if (
    !new CoordinateSystem96Well()
      .columns()
      .includes(coordinates.column as Coordinates['column'])
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
