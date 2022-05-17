import { CoordinateSystem } from './coordinateSystem';
import { CoordinatesXXXX, FlowDirection } from './types';

export class Coordinate {
  public row: CoordinatesXXXX['row'];

  public column: CoordinatesXXXX['column'];

  public coordinateSystem: CoordinateSystem;

  constructor(
    row: CoordinatesXXXX['row'],
    column: CoordinatesXXXX['column'],
    coordinateSystem: CoordinateSystem,
  ) {
    if (!coordinateSystem.rows().includes(row)) {
      throw new Error(
        `Expected a row with value of ${coordinateSystem
          .rows()
          .join(',')}, got ${row}.`,
      );
    }
    this.row = row;

    if (!coordinateSystem.columns().includes(column)) {
      throw new Error(
        `Expected a column with value of ${coordinateSystem
          .columns()
          .join(',')}, got ${column}.`,
      );
    }
    this.column = column;

    this.coordinateSystem = coordinateSystem;
  }

  static fromString(
    coordinateString: string,
    coordinateSystem: CoordinateSystem,
  ): Coordinate {
    const rows = coordinateSystem.rows();
    const rowsOptions = rows.join('|');

    const columns = [
      ...coordinateSystem.columns(),
      ...coordinateSystem.paddedColumns(),
    ];
    const columnsOptions = columns.join('|');

    const matches = coordinateString.match(
      new RegExp(`^(${rowsOptions})(${columnsOptions})`),
    );

    if (matches === null || matches?.length === 0) {
      const coordinateSystemClass = coordinateSystem.constructor.name;
      throw new Error(
        `Expected a coordinate with rows ${JSON.stringify(
          rows,
        )} and columns ${JSON.stringify(
          columns,
        )}  for ${coordinateSystemClass}, got: ${coordinateString}.`,
      );
    }

    return new this(
      matches[1] as CoordinatesXXXX['row'],
      Number(matches[2]) as CoordinatesXXXX['column'],
      coordinateSystem,
    );
  }

  toString(): string {
    return this.row + this.column;
  }

  static fromPosition(
    position: number,
    direction: FlowDirection,
    coordinateSystem: CoordinateSystem,
  ): Coordinate {
    this.assertPositionInRange(coordinateSystem, position);

    switch (direction) {
      case 'column':
        return new this(
          coordinateSystem.rowForColumnFlowPosition(position),
          coordinateSystem.columnForColumnFlowPosition(position),
          coordinateSystem,
        );

      case 'row':
        return new this(
          coordinateSystem.rowForRowFlowPosition(position),
          coordinateSystem.columnForRowFlowPosition(position),
          coordinateSystem,
        );
      default:
        throw new Error(`Unexpected flow direction direction ${direction}`);
    }
  }

  position(direction: FlowDirection): number {
    const rowIndex = this.coordinateSystem.rows().indexOf(this.row);

    const columnIndex = this.coordinateSystem.columns().indexOf(this.column);

    switch (direction) {
      case 'row':
        return (
          rowIndex * this.coordinateSystem.columns().length + columnIndex + 1
        );
      case 'column':
        return columnIndex * this.coordinateSystem.rows().length + rowIndex + 1;
      default:
        throw new Error(`Unexpected flow direction direction ${direction}`);
    }
  }

  static assertPositionInRange(
    coordinateSystem: CoordinateSystem,
    position: number,
  ): void {
    if (!coordinateSystem.all().includes(position)) {
      throw new Error(
        `Expected a position between ${
          coordinateSystem.all()[0]
        } - ${coordinateSystem.positionsCount()}, got: ${position}.`,
      );
    }
  }
}
