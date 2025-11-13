import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Plate } from '../Plate';
import { COORDINATE_SYSTEM_12X8 } from '../Plate/coordinateSystem12x8';
import { COORDINATE_SYSTEM_2X16 } from '../Plate/coordinateSystem2x16';
import { COORDINATE_SYSTEM_6X4 } from '../Plate/coordinateSystem6x4';
import { PALETTE } from '../theme';

import { TecanDeckView } from './TecanDeckView';
import { TecanLabwares } from './types';

export default {
  title: 'TecanDeckView',
  component: TecanDeckView,
};

/**
 * Interactive story to test TecanDeckView component.
 *
 * Use the toggles below to show/hide individual labwares.
 * Tests various scenarios:
 * - Text Length: Various well text lengths to test truncation and popover display
 * - Empty Columns: Tests dynamic column width adjustment for empty wells
 * - Layout flexibility: Toggle any combination of labwares
 */
export const Default: StoryFn<{
  textLength: 'short' | 'long' | 'extreme';
  showMmPlate: boolean;
  showAPlate: boolean;
  showBPlate: boolean;
  showNemoWater: boolean;
  showNemoDilution: boolean;
  showNemoDestPcr2: boolean;
  showNemoDestTaqMan: boolean;
  showDestPcr: boolean;
  showDestLc: boolean;
  showFluidX: boolean;
  showDestPcr1: boolean;
  showDestPcr2: boolean;
}> = function Default(args) {
  const { textLength } = args;

  const getText = (base: string) => {
    if (textLength === 'extreme') {
      return `${base}-ExtremelyLongTextThatShouldDefinitelyBeTruncatedInTheDetailView`;
    }
    if (textLength === 'long') {
      return `${base}-VeryLongSampleName-12345`;
    }
    return base;
  };

  const labwares: TecanLabwares = {};

  if (args.showMmPlate) {
    labwares.mmPlate = {
      content: (
        <Plate
          data={[
            { coordinates: { row: 'A', column: 1 }, content: getText('S1') },
            { coordinates: { row: 'A', column: 2 }, content: getText('S2') },
            { coordinates: { row: 'E', column: 1 }, content: getText('S5') },
            { coordinates: { row: 'H', column: 2 }, content: getText('S16') },
            { coordinates: { row: 'P', column: 1 }, content: getText('S31') },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_2X16}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showAPlate) {
    labwares.aPlate = {
      content: (
        <Plate
          data={[
            {
              coordinates: { row: 'A', column: 1 },
              content: getText('200µl-1'),
            },
            {
              coordinates: { row: 'B', column: 3 },
              content: getText('200µl-2'),
            },
            {
              coordinates: { row: 'D', column: 4 },
              content: getText('200µl-3'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_6X4}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showBPlate) {
    labwares.bPlate = {
      content: (
        <Plate
          data={[
            {
              coordinates: { row: 'A', column: 2 },
              content: getText('200µl-4'),
            },
            {
              coordinates: { row: 'C', column: 4 },
              content: getText('200µl-5'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_6X4}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showNemoWater) {
    labwares.nemoWater = {
      content: (
        <div
          style={{
            width: '200px',
            height: '100px',
            backgroundColor: PALETTE.gray1,
          }}
        />
      ),
    };
  }

  if (args.showNemoDilution) {
    labwares.nemoDilution = {
      content: (
        <Plate
          data={[
            { coordinates: { row: 'A', column: 1 }, content: getText('DIL-1') },
            {
              coordinates: { row: 'H', column: 12 },
              content: getText('DIL-96'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_12X8}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showNemoDestPcr2) {
    labwares.nemoDestPcr2 = {
      content: (
        <Plate
          data={[
            {
              coordinates: { row: 'A', column: 6 },
              content: getText('PCR2-6'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_12X8}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showNemoDestTaqMan) {
    labwares.nemoDestTaqMan = {
      content: (
        <Plate
          data={[
            { coordinates: { row: 'E', column: 5 }, content: getText('TM-53') },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_12X8}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showDestPcr) {
    labwares.destPcr = {
      content: (
        <Plate
          data={[
            {
              coordinates: { row: 'A', column: 1 },
              content: getText('PCR-A1'),
            },
            {
              coordinates: { row: 'D', column: 6 },
              content: getText('PCR-D6'),
            },
            {
              coordinates: { row: 'H', column: 12 },
              content: getText('P96'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_12X8}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showDestLc) {
    labwares.destLc = {
      content: (
        <Plate
          data={[
            {
              coordinates: { row: 'A', column: 3 },
              content: getText('LC-A3'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_12X8}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showFluidX) {
    labwares.fluidX = {
      content: (
        <Plate
          data={[
            { coordinates: { row: 'A', column: 1 }, content: getText('FX-1') },
            {
              coordinates: { row: 'H', column: 12 },
              content: getText('FX-96'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_12X8}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showDestPcr1) {
    labwares.destPcr1 = {
      content: (
        <Plate
          data={[
            {
              coordinates: { row: 'D', column: 8 },
              content: getText('DP1-44'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_12X8}
          wellSizing="compact"
        />
      ),
    };
  }

  if (args.showDestPcr2) {
    labwares.destPcr2 = {
      content: (
        <Plate
          data={[
            {
              coordinates: { row: 'F', column: 10 },
              content: getText('DP2-70'),
            },
          ]}
          coordinateSystem={COORDINATE_SYSTEM_12X8}
          wellSizing="compact"
        />
      ),
    };
  }

  return <TecanDeckView labwares={labwares} />;
};

Default.argTypes = {
  labwares: {
    table: { disable: true },
  },
  textLength: {
    control: { type: 'select' },
    options: ['short', 'long', 'extreme'],
    description:
      'Text length for well content. Tests truncation and popover display.',
  },
  showMmPlate: {
    control: { type: 'boolean' },
    description: 'Toggle MM Plate (2x16 coordinate system)',
  },
  showAPlate: {
    control: { type: 'boolean' },
    description: 'Toggle A Plate (6x4 coordinate system)',
  },
  showBPlate: {
    control: { type: 'boolean' },
    description: 'Toggle B Plate (6x4 coordinate system)',
  },
  showNemoWater: {
    control: { type: 'boolean' },
    description: 'Toggle Nemo Water (non-plate content)',
  },
  showNemoDilution: {
    control: { type: 'boolean' },
    description: 'Toggle Nemo Dilution (12x8 coordinate system)',
  },
  showNemoDestPcr2: {
    control: { type: 'boolean' },
    description: 'Toggle Nemo Dest PCR2 (12x8 coordinate system)',
  },
  showNemoDestTaqMan: {
    control: { type: 'boolean' },
    description: 'Toggle Nemo Dest TaqMan (12x8 coordinate system)',
  },
  showDestPcr: {
    control: { type: 'boolean' },
    description: 'Toggle Dest PCR (12x8 coordinate system)',
  },
  showDestLc: {
    control: { type: 'boolean' },
    description: 'Toggle Dest LC (12x8 coordinate system)',
  },
  showFluidX: {
    control: { type: 'boolean' },
    description: 'Toggle FluidX (12x8 coordinate system)',
  },
  showDestPcr1: {
    control: { type: 'boolean' },
    description: 'Toggle Dest PCR1 (12x8 coordinate system)',
  },
  showDestPcr2: {
    control: { type: 'boolean' },
    description: 'Toggle Dest PCR2 (12x8 coordinate system)',
  },
};

Default.args = {
  textLength: 'short',
  showMmPlate: true,
  showAPlate: false,
  showBPlate: false,
  showNemoWater: false,
  showNemoDilution: false,
  showNemoDestPcr2: false,
  showNemoDestTaqMan: false,
  showDestPcr: false,
  showDestLc: false,
  showFluidX: true,
  showDestPcr1: false,
  showDestPcr2: false,
};

export const FullDeck = Default.bind({});

FullDeck.args = {
  showMmPlate: true,
  showAPlate: true,
  showBPlate: true,
  showNemoWater: true,
  showNemoDilution: true,
  showNemoDestPcr2: true,
  showNemoDestTaqMan: true,
  showDestPcr: true,
  showDestLc: true,
  showFluidX: true,
  showDestPcr1: true,
  showDestPcr2: true,
};
