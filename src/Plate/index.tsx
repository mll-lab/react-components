import { range, uniq } from 'lodash';
import React, { ReactNode } from 'react';

import { MLL_THEME } from '../theme';

export type Coordinates = {
  row: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  column: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export type PlateWell = {
  coordinates: Coordinates;
  content?: ReactNode;
  selected?: boolean;
};

export type PlateProps = {
  data: Array<PlateWell>;
};

const TUBE_COUNT = 96;
const WELLS = range(1, TUBE_COUNT + 1);
const COLUMNS: Array<Coordinates['column']> = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
];
const ROWS: Array<Coordinates['row']> = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
];

function rowForPosition(position: number): Coordinates['row'] {
  return ROWS[Math.floor(position / COLUMNS.length)];
}

function columnForPosition(position: number): Coordinates['column'] {
  return COLUMNS[(position - 1) % COLUMNS.length];
}

function wellForPosition(
  position: number,
  data: Array<PlateWell>,
): PlateWell | undefined {
  return data.find(
    (well) =>
      well.coordinates.row === rowForPosition(position) &&
      well.coordinates.column === columnForPosition(position),
  );
}

const LINE_STYLE = {
  padding: '8px 4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function assertUniquePositions(data: Array<PlateWell>): void {
  const positions = data.map(
    (well) => `${well.coordinates.row}${well.coordinates.column}`,
  );

  if (uniq(positions).length !== data.length) {
    throw new Error(
      'Property "data" contains records with non-unique positions.',
    );
  }
}

export function Plate(props: PlateProps) {
  assertUniquePositions(props.data);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `1fr ${'4fr '.repeat(COLUMNS.length)}`,
        gridGap: '3px',
      }}
    >
      <span style={LINE_STYLE} />

      {COLUMNS.map((column) => (
        <span style={LINE_STYLE} key={column}>
          <strong>{column}</strong>
        </span>
      ))}

      {WELLS.map((position) => (
        <>
          {columnForPosition(position) === 1 && (
            <RowLabel position={position} />
          )}
          <Well
            key={position}
            position={position}
            wellData={wellForPosition(position, props.data)}
          />
        </>
      ))}
    </div>
  );
}

function Well(props: { position: number; wellData?: PlateWell }) {
  return (
    <span
      style={{
        backgroundColor: props.wellData?.selected
          ? MLL_THEME.warningColor
          : MLL_THEME.tableBorderColor,
        border: '1px solid lightgrey',
        ...LINE_STYLE,
      }}
    >
      {props.wellData?.content ?? (
        <small style={{ color: MLL_THEME.menuGroupBackgroundColor }}>
          {rowForPosition(props.position) + columnForPosition(props.position)}
        </small>
      )}
    </span>
  );
}

function RowLabel(props: { position: number }) {
  return <span style={LINE_STYLE}>{rowForPosition(props.position)}</span>;
}
