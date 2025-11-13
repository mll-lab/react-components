import * as React from 'react';

import { PALETTE } from '../theme';

import { EmptyLabware } from './EmptyLabware';
import { LabwareDetailItem } from './LabwareDetailItem';
import {
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

// Responsive scaling constants
const GRID_PADDING = 8; // Padding around the grid container (from style.padding)
const GRID_GAP = 8; // Gap between grid cells (from style.gap)
const COLUMN_COUNT = 5; // Number of columns in the grid
const GRID_OVERHEAD = GRID_PADDING * 2 + GRID_GAP * (COLUMN_COUNT - 1); // Total space used by padding and gaps
const COLUMN_OVERHEAD = 60; // Estimated width per column for borders and padding
const BASE_CONTENT_WIDTH = 1400; // Designed content width at 1.0 scale factor
const SCALE_SAFETY_MARGIN = 0.95; // 5% safety margin to prevent overflow
const MIN_SCALE_FACTOR = 0.1; // Minimum scale to keep content readable
const MAX_SCALE_FACTOR = 1.0; // Maximum scale (100% of designed size)
const INITIAL_SCALE_FACTOR = 0.7; // Initial scale before container width is measured

// Static styles
const CONTAINER_STYLE = {
  width: '100%',
} as const;

const GRID_CONTAINER_STYLE = {
  display: 'grid',
  gap: '8px',
  gridTemplateAreas: GRID_LAYOUT.map((row) => `"${row.join(' ')}"`).join(
    '\n  ',
  ),
  gridTemplateRows: 'auto auto auto',
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

export function TecanDeckView({ labwares }: { labwares: TecanLabwares }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = React.useState<number>();
  const [scaleFactor, setScaleFactor] = React.useState(INITIAL_SCALE_FACTOR);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

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
    if (availableWidth === undefined) {
      return;
    }

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
              alignSelf: metadata.gridPosition.alignment,
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
        scaleFactor={scaleFactor}
        backgroundColor={labware.color}
      />
    ) : (
      <EmptyLabware shortLabel={labware.shortLabel} />
    );

  return (
    <div ref={containerRef} style={CONTAINER_STYLE}>
      <div style={GRID_CONTAINER_STYLE}>
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
