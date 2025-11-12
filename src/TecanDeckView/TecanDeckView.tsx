import * as React from 'react';

import { PALETTE } from '../theme';

import { EmptyLabware } from './EmptyLabware';
import { LabwareDetailItem } from './LabwareDetailItem';
import { LABWARE_METADATA } from './labwareMetadata';
import { LabwareConfig, LabwareKey, TecanLabwares } from './types';

function getGridArea(key: LabwareKey): string {
  if (key === 'destPcr1' || key === 'destPcr2') {
    return 'rightColumn';
  }
  return key;
}

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

    const gridOverhead = 16 + 32;
    const itemOverheadPerColumn = 60;
    const totalItemOverhead = itemOverheadPerColumn * 5;
    const baseContentWidth = 1400;
    const availableContentWidth =
      (availableWidth - gridOverhead - totalItemOverhead) * 0.95;

    const calculatedScale = Math.max(
      0.1,
      Math.min(1.0, availableContentWidth / baseContentWidth),
    );
    setScaleFactor(calculatedScale);
  }, [availableWidth]);

  const allLabwareKeys = Object.keys(LABWARE_METADATA) as Array<LabwareKey>;
  const allLabwares: Array<LabwareConfig> = allLabwareKeys.map((key) => ({
    key,
    ...LABWARE_METADATA[key],
    content: labwares[key]?.content,
  }));

  const isRightColumnAndNeedContainer = (key: LabwareKey) =>
    key === 'destPcr1' || key === 'destPcr2';

  const ROW_1_KEYS = new Set<LabwareKey>([
    'aPlate',
    'nemoDilution',
    'destPcr',
    'destPcr1',
    'destPcr2',
  ]);
  const ROW_2_KEYS = new Set<LabwareKey>(['bPlate', 'nemoDestPcr2', 'destLc']);
  const ROW_3_KEYS = new Set<LabwareKey>([
    'nemoWater',
    'nemoDestTaqMan',
    'fluidX',
  ]);

  const getVerticalAlignment = (key: LabwareKey): string => {
    if (ROW_1_KEYS.has(key)) return 'start';
    if (ROW_3_KEYS.has(key)) return 'end';
    return 'center';
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

  const row1Empty = isRowEmpty(ROW_1_KEYS);
  const row2Empty = isRowEmpty(ROW_2_KEYS);
  const row3Empty = isRowEmpty(ROW_3_KEYS);

  const EMPTY_ROW_SIZE = '0.3fr';
  const CONTENT_ROW_SIZE = '1fr';

  const gridTemplateRows = [
    row1Empty ? EMPTY_ROW_SIZE : CONTENT_ROW_SIZE,
    row2Empty ? EMPTY_ROW_SIZE : CONTENT_ROW_SIZE,
    row3Empty ? EMPTY_ROW_SIZE : CONTENT_ROW_SIZE,
  ].join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto auto auto',
          gridTemplateRows,
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
        }}
      >
        {allLabwares
          .filter((labware) => !isRightColumnAndNeedContainer(labware.key))
          .map((labware) => (
            <div
              key={labware.key}
              style={{
                gridArea: getGridArea(labware.key),
                alignSelf: getVerticalAlignment(labware.key),
                justifySelf: 'center',
              }}
            >
              {renderLabware(labware)}
            </div>
          ))}

        <div
          style={{
            gridArea: 'rightColumn',
            display: 'grid',
            gridTemplateRows: 'auto auto',
            alignSelf: 'center',
            gap: '8px',
          }}
        >
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
