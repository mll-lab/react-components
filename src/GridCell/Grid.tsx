import styled from 'styled-components';

function frGetter(value: number | string): string {
  return typeof value === 'number' ? `repeat(${value}, 1fr)` : value;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  height: ${({ height = 'auto' }) => height};
  grid-auto-flow: ${({ flow = 'row' }) => flow};
  grid-auto-rows: ${({ minRowHeight = '20px' }) =>
    `minmax(${minRowHeight}, auto)`};
  ${({ rows }) => rows && `grid-template-rows: ${frGetter(rows)}`};
  grid-template-columns: ${({ columns = 12 }) => frGetter(columns)};
  grid-gap: ${({ gap = '8px' }) => gap};
  ${({ columnGap }) => columnGap && `column-gap: ${columnGap}`};
  ${({ rowGap }) => rowGap && `row-gap: ${rowGap}`};
  ${({ areas }) =>
    areas &&
    `grid-template-areas: ${areas.map((area) => `"${area}"`).join(' ')}`};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};
  ${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
`;

export type GridProps = {
  className?: string;
  columns?: string | number;
  gap?: string;
  columnGap?: string;
  rowGap?: string;
  height?: string;
  minRowHeight?: string;
  flow?: string;
  rows?: string | number;
  areas?: Array<string>;
  justifyContent?: string;
  alignContent?: string;
};
