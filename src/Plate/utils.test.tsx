import {
  COORDINATE_SYSTEM_12X8,
  CoordinateSystem12x8,
} from './coordinateSystem12x8';
import { Coordinates, CoordinateSystem } from './types';
import {
  allCoordinateSystemCoordinates,
  allCoordinateSystemPositions,
  areEqualCoordinates,
  columnForPosition,
  convertPositionFromColumnToRowFlow,
  convertPositionFromRowToColumnFlow,
  coordinateSystemSize,
  ensureCoordinatesInRange,
  rowForPosition,
} from './utils';

const data = [
  {
    rowFlowPosition: 1,
    columnFlowPosition: 1,
    row: 'A',
    column: 1,
  },
  {
    rowFlowPosition: 2,
    columnFlowPosition: 9,
    row: 'A',
    column: 2,
  },
  {
    rowFlowPosition: 3,
    columnFlowPosition: 17,
    row: 'A',
    column: 3,
  },
  {
    rowFlowPosition: 12,
    columnFlowPosition: 89,
    row: 'A',
    column: 12,
  },
  {
    rowFlowPosition: 13,
    columnFlowPosition: 2,
    row: 'B',
    column: 1,
  },
  {
    rowFlowPosition: 26,
    columnFlowPosition: 11,
    row: 'C',
    column: 2,
  },
  {
    rowFlowPosition: 42,
    columnFlowPosition: 44,
    row: 'D',
    column: 6,
  },
  {
    rowFlowPosition: 95,
    columnFlowPosition: 88,
    row: 'H',
    column: 11,
  },
  {
    rowFlowPosition: 96,
    columnFlowPosition: 96,
    row: 'H',
    column: 12,
  },
  {
    rowFlowPosition: 84,
    columnFlowPosition: 95,
    row: 'G',
    column: 12,
  },
];

describe.each(data)('rowForPosition', (dataSet) => {
  it('provides the row for a position depending on the flow', () => {
    expect(
      rowForPosition(dataSet.rowFlowPosition, 'row', COORDINATE_SYSTEM_12X8),
    ).toBe(dataSet.row);
    expect(
      rowForPosition(
        dataSet.columnFlowPosition,
        'column',
        COORDINATE_SYSTEM_12X8,
      ),
    ).toBe(dataSet.row);
  });
});

describe.each(data)('columnForPosition', (dataSet) => {
  it('provides the column for a position depending on the flow', () => {
    expect(
      columnForPosition(dataSet.rowFlowPosition, 'row', COORDINATE_SYSTEM_12X8),
    ).toBe(dataSet.column);
    expect(
      columnForPosition(
        dataSet.columnFlowPosition,
        'column',
        COORDINATE_SYSTEM_12X8,
      ),
    ).toBe(dataSet.column);
  });
});

describe.each(data)('convertPositionFromColumnToRowFlow', (dataSet) => {
  it(`converts ${dataSet.columnFlowPosition} to ${dataSet.rowFlowPosition}`, () => {
    expect(
      convertPositionFromColumnToRowFlow(
        dataSet.columnFlowPosition,
        COORDINATE_SYSTEM_12X8,
      ),
    ).toBe(dataSet.rowFlowPosition);
  });
});

describe.each(data)('convertPositionFromRowToColumnFlow', (dataSet) => {
  it(`converts ${dataSet.rowFlowPosition} to ${dataSet.columnFlowPosition}`, () => {
    expect(
      convertPositionFromRowToColumnFlow(
        dataSet.rowFlowPosition,
        COORDINATE_SYSTEM_12X8,
      ),
    ).toBe(dataSet.columnFlowPosition);
  });
});

describe('ensureCoordinatesInRange', () => {
  it('throws on invalid rows', () => {
    expect(() =>
      ensureCoordinatesInRange({ row: 'X', column: 2 }, COORDINATE_SYSTEM_12X8),
    ).toThrow();
  });

  it('throws on invalid columns', () => {
    expect(() =>
      ensureCoordinatesInRange(
        { row: 'B', column: 23 },
        COORDINATE_SYSTEM_12X8,
      ),
    ).toThrow();
  });

  it('works with valid coordinates', () => {
    const coordinates: Coordinates<CoordinateSystem12x8> = {
      row: 'A',
      column: 3,
    };
    expect(ensureCoordinatesInRange(coordinates, COORDINATE_SYSTEM_12X8)).toBe(
      coordinates,
    );
  });
});

describe('areEqualCoordinates', () => {
  it('match', () => {
    const a: Coordinates<CoordinateSystem12x8> = { row: 'A', column: 2 };
    expect(areEqualCoordinates(a, a)).toBe(true);
    expect(areEqualCoordinates(a, { ...a, foo: 'bar' })).toBe(true);
  });

  it('no match', () => {
    const a: Coordinates<CoordinateSystem12x8> = { row: 'A', column: 2 };
    const b: Coordinates<CoordinateSystem12x8> = { row: 'B', column: 3 };
    expect(areEqualCoordinates(a, b)).toBe(false);
    expect(areEqualCoordinates(a, { ...b, foo: 'bar' })).toBe(false);
  });
});

const COORDINATE_SYSTEM_2_BY_2 = {
  rows: ['A', 'B'],
  columns: [1, 2],
} as const satisfies CoordinateSystem;

describe('coordinateSystemSize', () => {
  it('returns the total number of positions in a coordinate system', () => {
    expect(coordinateSystemSize(COORDINATE_SYSTEM_2_BY_2)).toBe(4);
    expect(coordinateSystemSize(COORDINATE_SYSTEM_12X8)).toBe(96);
  });
});

describe('allCoordinateSystemPositions', () => {
  it('returns an array of all positions in a coordinate systems', () => {
    expect(allCoordinateSystemPositions(COORDINATE_SYSTEM_2_BY_2)).toEqual([
      1, 2, 3, 4,
    ]);
  });
});

describe('allCoordinateSystemCoordinates', () => {
  it('returns an array of all coordinates in column flow', () => {
    expect(
      allCoordinateSystemCoordinates(COORDINATE_SYSTEM_2_BY_2, 'column'),
    ).toEqual([
      { row: 'A', column: 1 },
      { row: 'A', column: 2 },
      { row: 'B', column: 1 },
      { row: 'B', column: 2 },
    ]);
  });

  it('returns an array of all coordinates in row flow', () => {
    expect(
      allCoordinateSystemCoordinates(COORDINATE_SYSTEM_2_BY_2, 'row'),
    ).toEqual([
      { row: 'A', column: 1 },
      { row: 'B', column: 1 },
      { row: 'A', column: 2 },
      { row: 'B', column: 2 },
    ]);
  });
});
