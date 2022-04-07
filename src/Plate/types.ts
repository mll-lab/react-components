import { ReactNode } from 'react';

import { CoordinateSystem } from './coordinateSystem';

export type Row = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type Rows = [Row, ...Array<Row>];
export type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Columns = [Column, ...Array<Column>];

export type Coordinates = {
  row: Row;
  column: Column;
};

export type FlowDirection = 'row' | 'column';

export type PlateWell = {
  coordinates: Coordinates;
  content?: ReactNode;
  color?: string;
};

export type PlateProps = {
  coordinateSystem: CoordinateSystem;
  data: Array<PlateWell> | null;
  loading?: boolean;
};
