import { Story } from '@storybook/react';
import React from 'react';

import { PALETTE } from '../theme';

import { CoordinateSystem12Well } from './coordinateSystem12Well';
import { CoordinateSystem96Well } from './coordinateSystem96Well';
import { PlateProps, PlateWell } from './types';
import { coordinatesForPosition } from './utils';

import { Plate } from './index';

export default {
  title: 'Plate',
  argTypes: {
    loading: { control: 'boolean' },
  },
};

const data: Array<PlateWell> = [
  {
    coordinates: {
      row: new CoordinateSystem96Well().rows()[0],
      column: new CoordinateSystem96Well().columns()[6],
    },
    content: <i>It renders any ReactNode</i>,
  },
  {
    coordinates: {
      row: new CoordinateSystem96Well().rows()[0],
      column: new CoordinateSystem96Well().columns()[7],
    },
    content: 'Test',
    color: PALETTE.red,
  },
  {
    coordinates: {
      row: new CoordinateSystem96Well().rows()[1],
      column: new CoordinateSystem96Well().columns()[2],
    },
    content: 'Some text',
  },
  {
    coordinates: {
      row: new CoordinateSystem96Well().rows()[2],
      column: new CoordinateSystem96Well().columns()[2],
    },
    content: (
      <>
        <p>Kontrolle</p>
        <br />
        Test Test Test Test Test Test
        <p>Kontrolle</p>
      </>
    ),
  },
];

const rowFlowData: Array<PlateWell> = new CoordinateSystem12Well()
  .all()
  .map((well) => ({
    coordinates: {
      row: new CoordinateSystem12Well().rowForRowFlowPosition(well),
      column: new CoordinateSystem12Well().columnForRowFlowPosition(well),
    },
    content: well,
  }));

const columnFlowData: Array<PlateWell> = new CoordinateSystem96Well()
  .all()
  .map((well) => ({
    coordinates: coordinatesForPosition(well, 'column'),
    content: well,
  }));

const Template: Story<Partial<PlateProps>> = (args) => (
  <Plate
    coordinateSystem={new CoordinateSystem96Well()}
    data={null}
    {...args}
  />
);

const Template12Well: Story<Partial<PlateProps>> = (args) => (
  <Plate
    coordinateSystem={new CoordinateSystem12Well()}
    data={null}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  data,
};

export const RowFlow = Template12Well.bind({});
RowFlow.args = {
  data: rowFlowData,
};

export const ColumnFlow = Template.bind({});
ColumnFlow.args = {
  data: columnFlowData,
};

/* TODO: delete after https://github.com/storybookjs/storybook/issues/11554 is resolved */
RowFlow.parameters = {
  docs: {
    source: {
      code: 'Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554',
    },
  },
};
Default.parameters = {
  docs: {
    source: {
      code: 'Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554',
    },
  },
};
ColumnFlow.parameters = {
  docs: {
    source: {
      code: 'Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554',
    },
  },
};
