import { Coordinate } from './coordinate';
import { CoordinateSystem12Well } from './coordinateSystem12Well';
import { CoordinateSystem96Well } from './coordinateSystem96Well';
import { CoordinatesXXXX } from './types';
import { areEqualCoordinates, ensureCoordinatesInRange } from './utils';

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

describe.each(data)(`coordinateForPosition`, (dataSet) => {
  it(`provides the Coordinate for a position depending on the flow`, () => {
    expect(
      Coordinate.fromPosition(
        dataSet.rowFlowPosition,
        'row',
        new CoordinateSystem96Well(),
      ).toString(),
    ).toBe(dataSet.row + dataSet.column);

    expect(
      Coordinate.fromPosition(
        dataSet.columnFlowPosition,
        'column',
        new CoordinateSystem96Well(),
      ).toString(),
    ).toBe(dataSet.row + dataSet.column);
  });
});

describe('ensureCoordinatesInRange', () => {
  it('throws on invalid rows', () => {
    expect(() => ensureCoordinatesInRange({ row: 'X', column: 2 })).toThrow();
  });

  it('throws on invalid columns', () => {
    expect(() => ensureCoordinatesInRange({ row: 'B', column: 23 })).toThrow();
  });

  it('works with valid coordinates', () => {
    const coordinates: CoordinatesXXXX = { row: 'A', column: 3 };
    expect(ensureCoordinatesInRange(coordinates)).toBe(coordinates);
  });
});

describe('areEqualCoordinates', () => {
  it('match', () => {
    const a: CoordinatesXXXX = { row: 'A', column: 2 };
    expect(areEqualCoordinates(a, a)).toBe(true);
    expect(areEqualCoordinates(a, { ...a, foo: 'bar' })).toBe(true);
  });

  it('no match', () => {
    const a: CoordinatesXXXX = { row: 'A', column: 2 };
    const b: CoordinatesXXXX = { row: 'B', column: 3 };
    expect(areEqualCoordinates(a, b)).toBe(false);
    expect(areEqualCoordinates(a, { ...b, foo: 'bar' })).toBe(false);
  });
});

describe('Plate', () => {
  it('renders without data', () => {
    render(
      <Plate coordinateSystem={new CoordinateSystem96Well()} data={null} />,
    );
  });
});

describe('Coordinate', () => {
  it('can be constructed from a string', () => {
    const baseExceptionMessage =
      'Expected a coordinate with rows ["A","B","C","D","E","F","G","H"] and columns [1,2,3,4,5,6,7,8,9,10,11,12,"01","02","03","04","05","06","07","08","09","10","11","12"]  for CoordinateSystem96Well, got:';
    expect(() =>
      Coordinate.fromString('', new CoordinateSystem96Well()),
    ).toThrow(`${baseExceptionMessage} .`);
    expect(() =>
      Coordinate.fromString('A', new CoordinateSystem96Well()),
    ).toThrow(`${baseExceptionMessage} A.`);
    expect(() =>
      Coordinate.fromString('1', new CoordinateSystem96Well()),
    ).toThrow(`${baseExceptionMessage} 1.`);

    expect(
      Coordinate.fromString('A1', new CoordinateSystem96Well()).toString(),
    ).toBe('A1');
  });
});

describe('Coordinate', () => {
  it('can can not be used in Plate with different CoordinateSystem', () => {
    expect(() =>
      render(
        <Plate
          coordinateSystem={new CoordinateSystem12Well()}
          data={[
            {
              coordinate: Coordinate.fromString(
                'A1',
                new CoordinateSystem96Well(),
              ),
              content: 'test',
            },
          ]}
        />,
      ),
    ).toThrow(
      'Property "data" contains records that are not of type "CoordinateSystem12Well": "CoordinateSystem96Well"',
    );
  });
});
