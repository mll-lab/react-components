import { columnForPosition, rowForPosition } from './index';

const rowFlowData = [
  {
    position: 1,
    row: 'A',
    column: 1,
  },
  {
    position: 2,
    row: 'A',
    column: 2,
  },
  {
    position: 3,
    row: 'A',
    column: 3,
  },
  {
    position: 12,
    row: 'A',
    column: 12,
  },
  {
    position: 13,
    row: 'B',
    column: 1,
  },
  {
    position: 26,
    row: 'C',
    column: 2,
  },
  {
    position: 95,
    row: 'H',
    column: 11,
  },
  {
    position: 96,
    row: 'H',
    column: 12,
  },
];

describe.each(rowFlowData)(`The position`, (dataSet) => {
  it(` ${dataSet.position} with row flow should be converted to row ${dataSet.row}`, () => {
    expect(rowForPosition(dataSet.position, 'row')).toBe(dataSet.row);
  });

  it(` ${dataSet.position} with row flow should be converted to column ${dataSet.column}`, () => {
    expect(columnForPosition(dataSet.position, 'row')).toBe(dataSet.column);
  });
});

const columnFlowData = [
  {
    position: 1,
    row: 'A',
    column: 1,
  },
  {
    position: 2,
    row: 'B',
    column: 1,
  },
  {
    position: 3,
    row: 'C',
    column: 1,
  },
  {
    position: 13,
    row: 'E',
    column: 2,
  },
  {
    position: 26,
    row: 'B',
    column: 4,
  },
  {
    position: 95,
    row: 'G',
    column: 12,
  },
  {
    position: 96,
    row: 'H',
    column: 12,
  },
];

describe.each(columnFlowData)(`The position`, (dataSet) => {
  it(` ${dataSet.position} with column flow should be converted to row ${dataSet.row}`, () => {
    expect(rowForPosition(dataSet.position, 'column')).toBe(dataSet.row);
  });

  it(` ${dataSet.position} with column flow should be converted to column ${dataSet.column}`, () => {
    expect(columnForPosition(dataSet.position, 'column')).toBe(dataSet.column);
  });
});
