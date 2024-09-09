import { uniq } from 'lodash';

import { CoordinateSystem96Well } from './coordinateSystem96Well';
import { CoordinatesXXXX, PlateProps, PlateWell } from './types';

export function areEqualCoordinates<
  A extends CoordinatesXXXX,
  B extends CoordinatesXXXX,
>(a: A, b: B): boolean {
  return a.row === b.row && a.column === b.column;
}

export function ensureCoordinatesInRange<
  T extends {
    row: string;
    column: number;
  },
>(coordinates: T): T & CoordinatesXXXX {
  if (
    !new CoordinateSystem96Well()
      .rows()
      .includes(coordinates.row as CoordinatesXXXX['row'])
  ) {
    throw new Error(
      `The given coordinates row ${coordinates.row} is not in range A-H.`,
    );
  }

  if (
    !new CoordinateSystem96Well()
      .columns()
      .includes(coordinates.column as CoordinatesXXXX['column'])
  ) {
    throw new Error(
      `The given coordinates column ${coordinates.column} is not in range 1-12.`,
    );
  }

  return coordinates as T & CoordinatesXXXX;
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

export function assertDataCoordinatesAreInCoordinateSystem(
  plateProps: PlateProps,
): void {
  plateProps.data?.forEach((well) => {
    if (
      well.coordinates.coordinateSystem.constructor.name !==
      plateProps.coordinateSystem.constructor.name
    ) {
      throw new Error(
        `Property "data" contains records that are not of type "${plateProps.coordinateSystem.constructor.name}": "${well.coordinates.coordinateSystem.constructor.name}"`,
      );
    }
  });
}
