import { range } from 'lodash';

import {
  CoordinateColumn,
  CoordinateColumns,
  PlateWell,
  CoordinateRow,
  CoordinateRows,
} from './types';

export abstract class CoordinateSystem {
  abstract rows(): CoordinateRows;

  abstract columns(): CoordinateColumns;

  rowForRowFlowPosition(position: number): CoordinateRow {
    return this.rows()[Math.floor((position - 1) / this.columnsCount())];
  }

  rowForColumnFlowPosition(position: number): CoordinateRow {
    return this.rows()[(position - 1) % this.rowsCount()];
  }

  columnForRowFlowPosition(position: number): CoordinateColumn {
    return this.columns()[(position - 1) % this.columnsCount()];
  }

  columnForColumnFlowPosition(position: number): CoordinateColumn {
    return this.columns()[Math.floor((position - 1) / this.rowsCount())];
  }

  positionsCount(): number {
    return this.columnsCount() * this.rowsCount();
  }

  rowsCount(): number {
    return this.rows().length;
  }

  columnsCount(): number {
    return this.columns().length;
  }

  all(): Array<number> {
    return range(1, this.rowsCount() * this.columnsCount() + 1);
  }

  wellAtPosition(
    position: number,
    data: Array<PlateWell>,
  ): PlateWell | undefined {
    return data.find(
      (well) =>
        well.coordinates.row === this.rowForRowFlowPosition(position) &&
        well.coordinates.column === this.columnForRowFlowPosition(position),
    );
  }

  /**
   * List of columns, 0-padded to all have the same length.
   */
  paddedColumns(): Array<string> {
    return this.columns().map((column) => column.toString().padStart(2, '0'));
  }
}
