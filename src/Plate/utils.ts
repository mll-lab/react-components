import { Maybe } from '@mll-lab/js-utils';
import { range, uniq } from 'lodash';

import {
  Coordinates,
  CoordinateSystem,
  FlowDirection,
  PlateWell,
} from './types';

export function rowForPosition<TCoordinateSystem extends CoordinateSystem>(
  position: number,
  flowDirection: FlowDirection,
  coordinateSystem: TCoordinateSystem,
): Coordinates<TCoordinateSystem>['row'] {
  switch (flowDirection) {
    case 'row':
      return coordinateSystem.rows[
        Math.floor((position - 1) / coordinateSystem.columns.length)
      ]!;
    case 'column':
      return coordinateSystem.rows[
        (position - 1) % coordinateSystem.rows.length
      ]!;
    default:
      throw new Error(`Unknown flow direction: ${flowDirection as string}`);
  }
}

export function columnForPosition<TCoordinateSystem extends CoordinateSystem>(
  position: number,
  flowDirection: FlowDirection,
  coordinateSystem: TCoordinateSystem,
): Coordinates<TCoordinateSystem>['column'] {
  switch (flowDirection) {
    case 'row':
      return coordinateSystem.columns[
        (position - 1) % coordinateSystem.columns.length
      ]!;
    case 'column':
      return coordinateSystem.columns[
        Math.floor((position - 1) / coordinateSystem.rows.length)
      ]!;
    default:
      throw new Error(`Unknown flow direction: ${flowDirection as string}`);
  }
}

export function coordinatesForPosition<
  TCoordinateSystem extends CoordinateSystem,
>(
  position: number,
  flowDirection: FlowDirection,
  coordinateSystem: TCoordinateSystem,
): Coordinates<TCoordinateSystem> {
  return {
    row: rowForPosition(position, flowDirection, coordinateSystem),
    column: columnForPosition(position, flowDirection, coordinateSystem),
  };
}

export function positionForCoordinates<
  TCoordinateSystem extends CoordinateSystem,
>(
  coordinates: Coordinates<TCoordinateSystem>,
  flowDirection: FlowDirection,
  coordinateSystem: TCoordinateSystem,
): number {
  const rowIndex = coordinateSystem.rows.indexOf(coordinates.row);
  const columnIndex = coordinateSystem.columns.indexOf(coordinates.column);

  switch (flowDirection) {
    case 'row':
      return rowIndex * coordinateSystem.columns.length + columnIndex + 1;
    case 'column':
      return columnIndex * coordinateSystem.rows.length + rowIndex + 1;
    default:
      throw new Error(`Unknown flow direction: ${flowDirection as string}`);
  }
}

export function wellAtPosition<TCoordinateSystem extends CoordinateSystem>(
  position: number,
  data: Array<PlateWell<TCoordinateSystem>>,
  flowDirection: FlowDirection,
  coordinateSystem: TCoordinateSystem,
): Maybe<PlateWell<TCoordinateSystem>> {
  return data.find(
    (well) =>
      well.coordinates.row ===
        rowForPosition(position, flowDirection, coordinateSystem) &&
      well.coordinates.column ===
        columnForPosition(position, flowDirection, coordinateSystem),
  );
}

export function convertPositionFromColumnToRowFlow(
  position: number,
  coordinateSystem: CoordinateSystem,
): number {
  const coordinates = coordinatesForPosition(
    position,
    'column',
    coordinateSystem,
  );

  return positionForCoordinates(coordinates, 'row', coordinateSystem);
}

export function convertPositionFromRowToColumnFlow(
  position: number,
  coordinateSystem: CoordinateSystem,
): number {
  const coordinates = coordinatesForPosition(position, 'row', coordinateSystem);

  return positionForCoordinates(coordinates, 'column', coordinateSystem);
}

export function areEqualCoordinates<
  A extends Coordinates<TCoordinateSystem>,
  B extends Coordinates<TCoordinateSystem>,
  TCoordinateSystem extends CoordinateSystem,
>(a: A, b: B): boolean {
  return a.row === b.row && a.column === b.column;
}

export function ensureCoordinatesInRange<
  T extends Coordinates<CoordinateSystem>,
  TCoordinateSystem extends CoordinateSystem,
>(
  coordinates: T,
  coordinateSystem: TCoordinateSystem,
): T & Coordinates<TCoordinateSystem> {
  if (!coordinateSystem.rows.includes(coordinates.row)) {
    throw new Error(
      `The given coordinates row ${
        coordinates.row
      } is not in range ${coordinateSystem.rows.join(',')}.`,
    );
  }

  if (!coordinateSystem.columns.includes(coordinates.column)) {
    throw new Error(
      `The given coordinates column ${
        coordinates.column
      } is not in range ${coordinateSystem.columns.join(',')}.`,
    );
  }

  return coordinates as T & Coordinates<TCoordinateSystem>;
}

export function assertUniquePositions(
  data: Array<PlateWell<CoordinateSystem>>,
): void {
  const positions = data.map(
    (well) => `${well.coordinates.row}${well.coordinates.column}`,
  );

  if (uniq(positions).length !== data.length) {
    throw new Error(
      'Property "data" contains records with non-unique positions.',
    );
  }
}

export function coordinateSystemSize(
  coordinateSystem: CoordinateSystem,
): number {
  return coordinateSystem.rows.length * coordinateSystem.columns.length;
}

export function allCoordinateSystemPositions(
  coordinateSystem: CoordinateSystem,
): Array<number> {
  return range(1, coordinateSystemSize(coordinateSystem) + 1);
}

export function allCoordinateSystemCoordinates<
  TCoordinateSystem extends CoordinateSystem,
>(
  coordinateSystem: TCoordinateSystem,
  flowDirection: FlowDirection,
): Array<Coordinates<TCoordinateSystem>> {
  if (flowDirection === 'column') {
    return coordinateSystem.rows
      .map((row) => coordinateSystem.columns.map((column) => ({ row, column })))
      .flat();
  }

  return coordinateSystem.columns
    .map((column) => coordinateSystem.rows.map((row) => ({ row, column })))
    .flat();
}
