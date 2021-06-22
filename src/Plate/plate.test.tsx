import {
  columnForPosition,
  convertPositionFromColumnToRowFlow,
  rowForPosition,
  convertPositionFromRowToColumnFlow,
} from './index';

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

describe.each(data)(`rowForPosition`, (dataSet) => {
  it(`provides the row for a position depending on the flow`, () => {
    expect(rowForPosition(dataSet.rowFlowPosition, 'row')).toBe(dataSet.row);
    expect(rowForPosition(dataSet.columnFlowPosition, 'column')).toBe(
      dataSet.row,
    );
  });
});

describe.each(data)(`columnForPosition`, (dataSet) => {
  it(`provides the column for a position depending on the flow`, () => {
    expect(columnForPosition(dataSet.rowFlowPosition, 'row')).toBe(
      dataSet.column,
    );
    expect(columnForPosition(dataSet.columnFlowPosition, 'column')).toBe(
      dataSet.column,
    );
  });
});

describe.each(data)(`convertPositionFromColumnToRowFlow`, (dataSet) => {
  it(`converts ${dataSet.columnFlowPosition} to ${dataSet.rowFlowPosition}`, () => {
    expect(convertPositionFromColumnToRowFlow(dataSet.columnFlowPosition)).toBe(
      dataSet.rowFlowPosition,
    );
  });
});

describe.each(data)(`convertPositionFromRowToColumnFlow`, (dataSet) => {
  it(`converts ${dataSet.rowFlowPosition} to ${dataSet.columnFlowPosition}`, () => {
    expect(convertPositionFromRowToColumnFlow(dataSet.rowFlowPosition)).toBe(
      dataSet.columnFlowPosition,
    );
  });
});
