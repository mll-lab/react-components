import * as React from 'react';

import { HiddenArea } from './HiddenArea';
import { ImageMap } from './ImageMap';
import { PopoverArea } from './PopoverArea';

type Labware = {
  content: React.ReactElement;
};

type LabwareWithPositon = {
  key: number;
  content?: React.ReactElement | null;
  position: React.SVGProps<SVGRectElement>;
};

const TOP_LABWARES_Y_POSITION = 115;
const MIDDEL_LABWARES_Y_POSITION = 170;
const LOWER_LABWARES_Y_POSITION = 225;

const LEFT_LABWARES_X_POSITION = 233;
const CENTER_LABWARES_X_POSITION = 317;
const RIGHT_LABWARES_X_POSITION = 399;

const MM_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  width: 35,
  height: 190,
  x: 192,
  y: 98,
};

const PLATE_SIZE_LANDSCAPE_MODE: React.SVGProps<SVGRectElement> = {
  width: 75,
  height: 50,
};

const PLATE_SIZE_PORTRAIT_MODE = {
  width: 50,
  height: 75,
};

const A_PLATE_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: LEFT_LABWARES_X_POSITION,
  y: TOP_LABWARES_Y_POSITION,
};
const B_PLATE_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: LEFT_LABWARES_X_POSITION,
  y: MIDDEL_LABWARES_Y_POSITION,
};
const NEMO_WATER_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: LEFT_LABWARES_X_POSITION,
  y: LOWER_LABWARES_Y_POSITION,
};
const NEMO_DILUTION_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: CENTER_LABWARES_X_POSITION,
  y: TOP_LABWARES_Y_POSITION,
};
const NEMO_DEST_PCR_2_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: CENTER_LABWARES_X_POSITION,
  y: MIDDEL_LABWARES_Y_POSITION,
};
const NEMO_DEST_TAQ_MAN_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: CENTER_LABWARES_X_POSITION,
  y: LOWER_LABWARES_Y_POSITION,
};

const DEST_PCR_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: RIGHT_LABWARES_X_POSITION,
  y: TOP_LABWARES_Y_POSITION,
};
const DEST_LC_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: RIGHT_LABWARES_X_POSITION,
  y: MIDDEL_LABWARES_Y_POSITION,
};
const FLUID_XLABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_LANDSCAPE_MODE,
  x: RIGHT_LABWARES_X_POSITION,
  y: LOWER_LABWARES_Y_POSITION,
};

const DEST_PCR_1_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_PORTRAIT_MODE,
  x: 492,
  y: 118,
};
const DEST_PCR_2_LABWARE_POSITION: React.SVGProps<SVGRectElement> = {
  ...PLATE_SIZE_PORTRAIT_MODE,
  x: 492,
  y: 192,
};

export function TecanLayout(props: {
  src: string;
  labwares: {
    mmPlate?: Labware;
    destPcr?: Labware;
    aPlate?: Labware;
    bPlate?: Labware;
    nemoWater?: Labware;
    nemoDilution?: Labware;
    nemoDestPcr2?: Labware;
    nemoDestTaqMan?: Labware;
    destLc?: Labware;
    fluidX?: Labware;
    destPcr1?: Labware;
    destPcr2?: Labware;
  };
}) {
  const labwaresWithPosition: Array<LabwareWithPositon> = [
    {
      key: 0,
      content: props.labwares.mmPlate?.content ?? null,
      position: MM_LABWARE_POSITION,
    },
    {
      key: 1,
      content: props.labwares.destPcr?.content ?? null,
      position: DEST_PCR_LABWARE_POSITION,
    },
    {
      key: 2,
      content: props.labwares.aPlate?.content ?? null,
      position: A_PLATE_LABWARE_POSITION,
    },
    {
      key: 3,
      content: props.labwares.bPlate?.content ?? null,
      position: B_PLATE_LABWARE_POSITION,
    },
    {
      key: 4,
      content: props.labwares.nemoWater?.content ?? null,
      position: NEMO_WATER_LABWARE_POSITION,
    },
    {
      key: 5,
      content: props.labwares.nemoDilution?.content ?? null,
      position: NEMO_DILUTION_LABWARE_POSITION,
    },
    {
      key: 6,
      content: props.labwares.nemoDestPcr2?.content ?? null,
      position: NEMO_DEST_PCR_2_LABWARE_POSITION,
    },
    {
      key: 7,
      content: props.labwares.nemoDestTaqMan?.content ?? null,
      position: NEMO_DEST_TAQ_MAN_LABWARE_POSITION,
    },
    {
      key: 8,
      content: props.labwares.destLc?.content ?? null,
      position: DEST_LC_LABWARE_POSITION,
    },
    {
      key: 9,
      content: props.labwares.fluidX?.content ?? null,
      position: FLUID_XLABWARE_POSITION,
    },
    {
      key: 10,
      content: props.labwares.destPcr1?.content ?? null,
      position: DEST_PCR_1_LABWARE_POSITION,
    },
    {
      key: 11,
      content: props.labwares.destPcr2?.content ?? null,
      position: DEST_PCR_2_LABWARE_POSITION,
    },
  ];

  return (
    <ImageMap src={props.src}>
      <>
        {labwaresWithPosition.map((item) => {
          if (item.content) {
            return (
              <PopoverArea
                key={item.key}
                title="Labware Detailansicht"
                position={item.position}
                content={item.content}
              />
            );
          }
          return <HiddenArea position={item.position} key={item.key} />;
        })}
      </>
    </ImageMap>
  );
}
