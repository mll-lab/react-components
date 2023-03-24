import { Story } from '@storybook/react';
import React from 'react';

import { Plate } from '../Plate';
import { TecanLayout } from '../index';

import { HiddenArea } from './HiddenArea';
import { ImageMap, ImageMapProps } from './ImageMap';
import { PopoverArea } from './PopoverArea';

export default {
  title: 'ImageMap',
};

export const TecanLayoutExample: Story = function Default() {
  return (
    <TecanLayout
      src="https://picsum.photos/600/400"
      labwares={{
        mmPlate: { content: <>Test1</> },
        destLc: {
          content: (
            <Plate
              data={[{ coordinates: { row: 'A', column: 3 }, content: 'test' }]}
            />
          ),
        },
      }}
    />
  );
};

export const Default: Story<ImageMapProps> = function Default(args) {
  return (
    <ImageMap {...args}>
      <HiddenArea
        key={0}
        position={{
          width: 50,
          height: 75,
          x: 492,
          y: 192,
        }}
      />
      <PopoverArea
        key={1}
        title="Labware Detailansicht"
        position={{
          width: 35,
          height: 190,
          x: 192,
          y: 98,
        }}
        content={
          <Plate
            data={[{ coordinates: { row: 'A', column: 3 }, content: 'test' }]}
          />
        }
      />
    </ImageMap>
  );
};

Default.argTypes = {
  src: {
    control: { type: 'text' },
    defaultValue: 'https://picsum.photos/600/600',
  },
};
