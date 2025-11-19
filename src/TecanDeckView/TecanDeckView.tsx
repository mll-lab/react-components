import * as React from 'react';

import { Plate } from '../Plate';
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
  Labware,
  LabwareConfig,
  LabwareKey,
  LabwareWithStyle,
  TecanLabwares,
} from './types';

const GRID_PADDING = 8;
const GRID_GAP = 8;
const COLUMN_COUNT = 5;
const ROW_COUNT = 3;
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

function calculateGridTemplateColumns(labwares: TecanLabwares): string {
  const filledByColumn = getFilledLabwaresByColumn(labwares);

  return Array.from({ length: COLUMN_COUNT }, (_, i) =>
    (filledByColumn[i]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)',
  ).join(' ');
}

function calculateGridTemplateRows(labwares: TecanLabwares): string {
  const filledByRow = getFilledLabwaresByRow(labwares);

  return Array.from({ length: ROW_COUNT }, (_, i) =>
    (filledByRow[i]?.length ?? 0) > 0 ? 'auto' : 'minmax(40px, 60px)',
  ).join(' ');
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
            labware: labwares[key],
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

  const renderLabwareContent = (
    labware: Labware,
    coordinateSystem: LabwareConfig['coordinateSystem'],
  ) => {
    if (labware.type === 'custom') {
      return labware.content;
    }

    return (
      <Plate
        coordinateSystem={coordinateSystem}
        data={labware.data}
        loading={labware.loading}
        wellSizing={labware.wellSizing ?? 'compact'}
      />
    );
  };

  const renderLabware = (labwareConfig: LabwareConfig) =>
    labwareConfig.labware ? (
      <LabwareDetailItem
        shortLabel={labwareConfig.shortLabel}
        content={renderLabwareContent(
          labwareConfig.labware,
          labwareConfig.coordinateSystem,
        )}
        backgroundColor={labwareConfig.color}
      />
    ) : (
      <EmptyLabware shortLabel={labwareConfig.shortLabel} />
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
