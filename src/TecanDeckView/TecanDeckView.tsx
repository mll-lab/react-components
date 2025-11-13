import * as React from 'react';

import { PALETTE } from '../theme';

import { EmptyLabware } from './EmptyLabware';
import { LabwareDetailItem } from './LabwareDetailItem';
import { LABWARE_METADATA } from './labwareMetadata';
import { LabwareConfig, LabwareKey, TecanLabwares } from './types';

// Responsive scaling constants
const GRID_PADDING = 8; // Padding around the grid container (from style.padding)
const GRID_GAP = 8; // Gap between grid cells (from style.gap)
const COLUMN_COUNT = 5; // Number of columns in the grid
const GRID_OVERHEAD = GRID_PADDING * 2 + GRID_GAP * (COLUMN_COUNT - 1); // Total space used by padding and gaps
const COLUMN_OVERHEAD = 60; // Estimated width per column for borders and padding
const BASE_CONTENT_WIDTH = 1400; // Designed content width at 1.0 scale factor
const SCALE_SAFETY_MARGIN = 0.95; // 5% safety margin to prevent overflow

// Static styles
const CONTAINER_STYLE = {
  width: '100%',
} as const;

const GRID_CONTAINER_BASE_STYLE = {
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto auto',
  gap: '8px',
  gridTemplateAreas: `
    "mmPlate aPlate nemoDilution destPcr rightColumn"
    "mmPlate bPlate nemoDestPcr2 destLc rightColumn"
    "mmPlate nemoWater nemoDestTaqMan fluidX rightColumn"
  `,
  padding: '8px',
  backgroundColor: PALETTE.gray1,
  borderRadius: '4px',
  width: 'fit-content',
} as const;

const LABWARE_ITEM_BASE_STYLE = {
  justifySelf: 'center',
} as const;

const RIGHT_COLUMN_STYLE = {
  gridArea: 'rightColumn',
  display: 'grid',
  gridTemplateRows: 'auto auto',
  alignSelf: 'center',
  gap: '8px',
} as const;

export function TecanDeckView({ labwares }: { labwares: TecanLabwares }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = React.useState<number>();
  const [scaleFactor, setScaleFactor] = React.useState(0.7);

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
      0.1,
      Math.min(1.0, availableContentWidth / BASE_CONTENT_WIDTH),
    );
    setScaleFactor(calculatedScale);
  }, [availableWidth]);

  const allLabwares: Array<LabwareConfig> = React.useMemo(() => {
    const allLabwareKeys = Object.keys(LABWARE_METADATA) as Array<LabwareKey>;
    return allLabwareKeys.map((key) => ({
      key,
      ...LABWARE_METADATA[key],
      content: labwares[key]?.content,
    }));
  }, [labwares]);

  const isRightColumnAndNeedContainer = (key: LabwareKey) =>
    key === 'destPcr1' || key === 'destPcr2';

  const ROWS = [
    {
      keys: new Set<LabwareKey>([
        'aPlate',
        'nemoDilution',
        'destPcr',
        'destPcr1',
        'destPcr2',
      ]),
      alignment: 'start' as const,
    },
    {
      keys: new Set<LabwareKey>(['bPlate', 'nemoDestPcr2', 'destLc']),
      alignment: 'center' as const,
    },
    {
      keys: new Set<LabwareKey>(['nemoWater', 'nemoDestTaqMan', 'fluidX']),
      alignment: 'end' as const,
    },
  ];

  const getVerticalAlignment = (key: LabwareKey): string => {
    const row = ROWS.find((r) => r.keys.has(key));
    return row?.alignment ?? 'center';
  };

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

  // Check if a row contains only empty labware
  const isRowEmpty = (rowKeys: Set<LabwareKey>): boolean =>
    Array.from(rowKeys).every((key) => !labwares[key]?.content);

  const EMPTY_ROW_SIZE = '0.3fr';
  const CONTENT_ROW_SIZE = '1fr';

  const gridTemplateRows = ROWS.map((row) =>
    isRowEmpty(row.keys) ? EMPTY_ROW_SIZE : CONTENT_ROW_SIZE,
  ).join(' ');

  return (
    <div ref={containerRef} style={CONTAINER_STYLE}>
      <div
        style={{
          ...GRID_CONTAINER_BASE_STYLE,
          gridTemplateRows,
        }}
      >
        {allLabwares
          .filter((labware) => !isRightColumnAndNeedContainer(labware.key))
          .map((labware) => (
            <div
              key={labware.key}
              style={{
                ...LABWARE_ITEM_BASE_STYLE,
                gridArea: labware.key,
                alignSelf: getVerticalAlignment(labware.key),
              }}
            >
              {renderLabware(labware)}
            </div>
          ))}

        <div style={RIGHT_COLUMN_STYLE}>
          {allLabwares
            .filter((labware) => isRightColumnAndNeedContainer(labware.key))
            .map((labware) => (
              <div key={labware.key}>{renderLabware(labware)}</div>
            ))}
        </div>
      </div>
    </div>
  );
}
