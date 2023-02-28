import * as React from 'react';

import { HiddenArea } from './HiddenArea';
import { PopOverArea } from './PopOverArea';

import { ImageMap } from './index';

type Labware = {
  content: React.ReactElement;
};

type LabwareWithPositon = {
  key: number;
  content?: React.ReactElement;
  position: React.SVGProps<SVGRectElement>;
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
  const plateSizeLandscapeMode: React.SVGProps<SVGRectElement> = {
    width: 75,
    height: 50,
  };

  const plateSizePortraitMode = {
    width: 50,
    height: 75,
  };

  const mmLabwarePosition: React.SVGProps<SVGRectElement> = {
    width: 35,
    height: 190,
    x: 192,
    y: 98,
  };

  const topLabwaresYPosition = 115;
  const middelLabwaresYPosition = 170;
  const lowerLabwaresYPosition = 225;

  const leftLabwaresXPosition = 233;
  const centerLabwaresXPosition = 317;
  const rightLabwaresXPosition = 399;

  const aPlateLabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: leftLabwaresXPosition,
    y: topLabwaresYPosition,
  };
  const bPlateLabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: leftLabwaresXPosition,
    y: middelLabwaresYPosition,
  };
  const nemoWaterLabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: leftLabwaresXPosition,
    y: lowerLabwaresYPosition,
  };
  const nemoDilutionLabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: centerLabwaresXPosition,
    y: topLabwaresYPosition,
  };
  const nemoDestPcr2LabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: centerLabwaresXPosition,
    y: middelLabwaresYPosition,
  };
  const nemoDestTaqManLabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: centerLabwaresXPosition,
    y: lowerLabwaresYPosition,
  };

  const destPcrLabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: rightLabwaresXPosition,
    y: topLabwaresYPosition,
  };
  const destLcLabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: rightLabwaresXPosition,
    y: middelLabwaresYPosition,
  };
  const fluidXLabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizeLandscapeMode,
    x: rightLabwaresXPosition,
    y: lowerLabwaresYPosition,
  };

  const destPcr1LabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizePortraitMode,
    x: 492,
    y: 118,
  };
  const destPcr2LabwarePosition: React.SVGProps<SVGRectElement> = {
    ...plateSizePortraitMode,
    x: 492,
    y: 192,
  };

  const labwaresWithPosition: Array<LabwareWithPositon> = [
    {
      key: 0,
      content: props.labwares.mmPlate?.content ?? undefined,
      position: mmLabwarePosition,
    },
    {
      key: 1,
      content: props.labwares.destPcr?.content ?? undefined,
      position: destPcrLabwarePosition,
    },
    {
      key: 2,
      content: props.labwares.aPlate?.content ?? undefined,
      position: aPlateLabwarePosition,
    },
    {
      key: 3,
      content: props.labwares.bPlate?.content ?? undefined,
      position: bPlateLabwarePosition,
    },
    {
      key: 4,
      content: props.labwares.nemoWater?.content ?? undefined,
      position: nemoWaterLabwarePosition,
    },
    {
      key: 5,
      content: props.labwares.nemoDilution?.content ?? undefined,
      position: nemoDilutionLabwarePosition,
    },
    {
      key: 6,
      content: props.labwares.nemoDestPcr2?.content ?? undefined,
      position: nemoDestPcr2LabwarePosition,
    },
    {
      key: 7,
      content: props.labwares.nemoDestTaqMan?.content ?? undefined,
      position: nemoDestTaqManLabwarePosition,
    },
    {
      key: 8,
      content: props.labwares.destLc?.content ?? undefined,
      position: destLcLabwarePosition,
    },
    {
      key: 9,
      content: props.labwares.fluidX?.content ?? undefined,
      position: fluidXLabwarePosition,
    },
    {
      key: 10,
      content: props.labwares.destPcr1?.content ?? undefined,
      position: destPcr1LabwarePosition,
    },
    {
      key: 11,
      content: props.labwares.destPcr2?.content ?? undefined,
      position: destPcr2LabwarePosition,
    },
  ];

  return (
    <ImageMap src={props.src}>
      <>
        {labwaresWithPosition.map((item) => {
          if (item.content) {
            return (
              <PopOverArea
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
