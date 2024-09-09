import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import { PALETTE } from '../theme';

import {
  COORDINATE_SYSTEM_96_WELL,
  CoordinateSystem96Well,
} from './coordinateSystem96Well';
import { PlateProps, PlateWell } from './types';
import { allCoordinateSystemPositions, coordinatesForPosition } from './utils';

import { Plate } from './index';

export default {
  title: 'Plate',
  argTypes: {
    loading: { control: 'boolean' },
    isDraggable: { control: 'boolean' },
  },
};

const data: Array<PlateWell<CoordinateSystem96Well>> = [
  {
    coordinates: {
      row: COORDINATE_SYSTEM_96_WELL.rows[0],
      column: COORDINATE_SYSTEM_96_WELL.columns[6],
    },
    content: <i>It renders any ReactNode</i>,
  },
  {
    coordinates: {
      row: COORDINATE_SYSTEM_96_WELL.rows[0],
      column: COORDINATE_SYSTEM_96_WELL.columns[7],
    },
    content: 'Test',
    color: PALETTE.red,
  },
  {
    coordinates: {
      row: COORDINATE_SYSTEM_96_WELL.rows[1],
      column: COORDINATE_SYSTEM_96_WELL.columns[2],
    },
    content: 'Some text',
  },
  {
    coordinates: {
      row: COORDINATE_SYSTEM_96_WELL.rows[2],
      column: COORDINATE_SYSTEM_96_WELL.columns[2],
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

const COORDINATE_SYSTEM_96_WELL_POSITIONS = allCoordinateSystemPositions(
  COORDINATE_SYSTEM_96_WELL,
);

const rowFlowData: Array<PlateWell<CoordinateSystem96Well>> =
  COORDINATE_SYSTEM_96_WELL_POSITIONS.map((well) => ({
    coordinates: coordinatesForPosition(well, 'row', COORDINATE_SYSTEM_96_WELL),
    content: well,
  }));

const columnFlowData: Array<PlateWell<CoordinateSystem96Well>> =
  COORDINATE_SYSTEM_96_WELL_POSITIONS.map((well) => ({
    coordinates: coordinatesForPosition(
      well,
      'column',
      COORDINATE_SYSTEM_96_WELL,
    ),
    content: well,
  }));

const Template: Story<Partial<PlateProps<CoordinateSystem96Well>>> =
  function Template(args) {
    return (
      <Plate
        data={null}
        coordinateSystem={COORDINATE_SYSTEM_96_WELL}
        dndContextProps={{
          onDragEnd: action('onDragEnd'), // dataLocation: `const sourceData = e.active.data.current; const targetData = e.over?.data.current;`
        }}
        {...args}
      />
    );
  };

export const Default = Template.bind({});
Default.args = {
  data,
};

export const RowFlow = Template.bind({});
RowFlow.args = {
  data: rowFlowData,
};

export const ColumnFlow = Template.bind({});
ColumnFlow.args = {
  data: columnFlowData,
};
