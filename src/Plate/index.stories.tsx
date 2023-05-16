import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import { PALETTE } from '../theme';

import { COORDINATES_COLUMNS, COORDINATES_ROWS, WELLS } from './constants';
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
    coordinates: { row: COORDINATES_ROWS[0], column: COORDINATES_COLUMNS[6] },
    content: <i>It renders any ReactNode</i>,
  },
  {
    coordinates: { row: COORDINATES_ROWS[0], column: COORDINATES_COLUMNS[7] },
    content: 'Test',
    color: PALETTE.red,
  },
  {
    coordinates: { row: COORDINATES_ROWS[1], column: COORDINATES_COLUMNS[2] },
    content: 'Some text',
  },
  {
    coordinates: { row: COORDINATES_ROWS[2], column: COORDINATES_COLUMNS[2] },
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

const rowFlowData: Array<PlateWell> = WELLS.map((well) => ({
  coordinates: coordinatesForPosition(well, 'row'),
  content: well,
}));

const columnFlowData: Array<PlateWell> = WELLS.map((well) => ({
  coordinates: coordinatesForPosition(well, 'column'),
  content: well,
}));

const Template: Story<Partial<PlateProps>> = function Template(args) {
  return <Plate data={null} {...args} />;
};

const DraggablePlateTemplate: Story<Partial<PlateProps>> =
  function DraggablePlateTemplate(args) {
    return (
      <Plate
        data={null}
        {...args}
        draggable={{
          dndContextProps: {
            onDragEnd: action('onDragEnd'), // dataLocation: `const sourceData = e.active.data.current; const targetData = e.over?.data.current;`
          },
        }}
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

export const Draggable = DraggablePlateTemplate.bind({});
Draggable.args = {
  data,
};
