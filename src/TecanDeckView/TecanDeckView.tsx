import * as React from 'react';

import { PALETTE } from '../theme';

import { EmptyLabware } from './EmptyLabware';
import { LabwareDetailItem } from './LabwareDetailItem';
import {
  getFilledLabwaresByColumn,
  getFilledLabwaresByRow,
  GRID_LAYOUT,
  isLeftColumn,
  isRightColumn,
  LABWARE_METADATA,
} from './labwareMetadata';
import {
  LabwareConfig,
  LabwareKey,
  LabwareWithStyle,
  TecanLabwares,
} from './types';

// Scaling constants for fit-to-width behavior
const GRID_PADDING = 8;
const GRID_GAP = 8;
const COLUMN_COUNT = 5;
const GRID_OVERHEAD = GRID_PADDING * 2 + GRID_GAP * (COLUMN_COUNT - 1);
const COLUMN_OVERHEAD = 60;
const BASE_CONTENT_WIDTH = 1400;
const SCALE_SAFETY_MARGIN = 0.95;
const MIN_SCALE_FACTOR = 0.1;
const MAX_SCALE_FACTOR = 1.0;
const INITIAL_SCALE_FACTOR = 0.7;

// Static styles
const CONTAINER_STYLE = {
  width: '100%',
} as const;

const GRID_CONTAINER_STYLE = {
  display: 'grid',
  gridTemplateAreas: GRID_LAYOUT.map((row) => `"${row.join(' ')}"`).join(
    '\n  ',
  ),
  padding: '8px',
  backgroundColor: PALETTE.gray1,
  borderRadius: '4px',
  width: 'fit-content',
} as const;

const LABWARE_ITEM_BASE_STYLE = {
  justifySelf: 'center',
} as const;

// Shared style for columns that span all 3 grid rows
const SPANNING_COLUMN_BASE_STYLE = {
  display: 'grid',
  alignSelf: 'center',
  gap: '8px',
} as const;

const LEFT_COLUMN_STYLE = {
  ...SPANNING_COLUMN_BASE_STYLE,
  gridArea: 'leftColumn',
} as const;

const RIGHT_COLUMN_STYLE = {
  ...SPANNING_COLUMN_BASE_STYLE,
  gridArea: 'rightColumn',
} as const;

// Helper functions for dynamic grid sizing

/**
 * Calculates dynamic grid-template-columns based on which columns have content.
 * Empty columns get minimal width (40-60px), filled columns get proportional sizes
 * matching physical Tecan deck dimensions (column 1: 0.5fr, columns 2-3: 1fr).
 */
function calculateGridTemplateColumns(labwares: TecanLabwares): string {
  const filledByColumn = getFilledLabwaresByColumn(labwares);

  const columnSizes = [
    (filledByColumn[0]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)', // Column 0
    (filledByColumn[1]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)', // Column 1
    (filledByColumn[2]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)', // Column 2
    (filledByColumn[3]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)', // Column 3
    (filledByColumn[4]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)', // Column 4
  ];

  return columnSizes.join(' ');
}

/**
 * Calculates dynamic grid-template-rows based on which rows have content.
 * Empty rows get minimal height (40-60px), filled rows get auto.
 */
function calculateGridTemplateRows(labwares: TecanLabwares): string {
  const filledByRow = getFilledLabwaresByRow(labwares);

  const rowSizes = [
    (filledByRow[0]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)', // Row 0
    (filledByRow[1]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)', // Row 1
    (filledByRow[2]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)', // Row 2
  ];

  return rowSizes.join(' ');
}

export function TecanDeckView({ labwares }: { labwares: TecanLabwares }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = React.useState<number>();
  const [scaleFactor, setScaleFactor] = React.useState(INITIAL_SCALE_FACTOR);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      setAvailableWidth(container.offsetWidth);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (availableWidth === undefined) return;

    const totalColumnOverhead = COLUMN_OVERHEAD * COLUMN_COUNT;
    const availableContentWidth =
      (availableWidth - GRID_OVERHEAD - totalColumnOverhead) *
      SCALE_SAFETY_MARGIN;

    const calculatedScale = Math.max(
      MIN_SCALE_FACTOR,
      Math.min(MAX_SCALE_FACTOR, availableContentWidth / BASE_CONTENT_WIDTH),
    );
    setScaleFactor(calculatedScale);
  }, [availableWidth]);

  // Calculate dynamic grid styling based on content
  const gridStyle = React.useMemo(
    () => ({
      gridTemplateColumns: calculateGridTemplateColumns(labwares),
      gridTemplateRows: calculateGridTemplateRows(labwares),
      gap: '8px',
    }),
    [labwares],
  );

  // Group labwares into spanning columns and main grid in a single pass
  const { leftColumnLabwares, rightColumnLabwares, mainGridLabwares } =
    React.useMemo(() => {
      const allLabwareKeys = Object.keys(LABWARE_METADATA) as Array<LabwareKey>;

      return allLabwareKeys.reduce(
        (acc, key) => {
          const metadata = LABWARE_METADATA[key];
          const labware: LabwareWithStyle = {
            key,
            ...metadata,
            content: labwares[key]?.content,
            style: {
              ...LABWARE_ITEM_BASE_STYLE,
              gridArea: key,
              alignSelf: 'center',
            },
          };

          if (isLeftColumn(key)) {
            acc.leftColumnLabwares.push(labware);
          } else if (isRightColumn(key)) {
            acc.rightColumnLabwares.push(labware);
          } else {
            acc.mainGridLabwares.push(labware);
          }

          return acc;
        },
        {
          leftColumnLabwares: [] as Array<LabwareWithStyle>,
          rightColumnLabwares: [] as Array<LabwareWithStyle>,
          mainGridLabwares: [] as Array<LabwareWithStyle>,
        },
      );
    }, [labwares]);

  const renderLabware = (labware: LabwareConfig) =>
    labware.content ? (
      <LabwareDetailItem
        shortLabel={labware.shortLabel}
        content={labware.content}
        backgroundColor={labware.color}
      />
    ) : (
      <EmptyLabware shortLabel={labware.shortLabel} />
    );

  return (
    <div ref={containerRef} style={CONTAINER_STYLE}>
      <div
        style={{
          ...GRID_CONTAINER_STYLE,
          ...gridStyle,
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'top left',
        }}
      >
        <div style={LEFT_COLUMN_STYLE}>
          {leftColumnLabwares.map((labware) => (
            <div key={labware.key}>{renderLabware(labware)}</div>
          ))}
        </div>

        {mainGridLabwares.map((labware) => (
          <div key={labware.key} style={labware.style}>
            {renderLabware(labware)}
          </div>
        ))}

        <div style={RIGHT_COLUMN_STYLE}>
          {rightColumnLabwares.map((labware) => (
            <div key={labware.key}>{renderLabware(labware)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
