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
