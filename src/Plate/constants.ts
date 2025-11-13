import { FlowDirection } from './types';

/** Used internally when rendering the Plate component. */
export const PLATE_FLOW = 'row' as const satisfies FlowDirection;

/** Width of the row label column (scales with font size) */
export const ROW_LABEL_WIDTH = '3ch';

/** Well column width in uniform mode (proportional spacing) */
export const WELL_COLUMN_WIDTH_UNIFORM = '4fr';

/** Well column width in compact mode (fits content) */
export const WELL_COLUMN_WIDTH_COMPACT = 'auto';

/** Gap between grid cells */
export const GRID_GAP = '3px';
