import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import { PALETTE } from '../theme';

import { Coordinate } from './coordinate';
import { CoordinateSystem12Well } from './coordinateSystem12Well';
import { CoordinateSystem96Well } from './coordinateSystem96Well';
import { COORDINATES_COLUMNS, COORDINATES_ROWS, WELLS } from './constants';
import { PlateProps, PlateWell } from './types';

import { Plate } from './index';

export default {
  title: 'Plate',
  argTypes: {
    loading: { control: 'boolean' },
    isDraggable: { control: 'boolean' },
  },
};

const data: Array<PlateWell> = [
  {
    coordinate: new Coordinate('A', 6, new CoordinateSystem96Well()),
    content: <i>It renders any ReactNode</i>,
  },
  {
    coordinate: new Coordinate('A', 7, new CoordinateSystem96Well()),
    content: 'Test',
    color: PALETTE.red,
  },
  {
    coordinate: new Coordinate('B', 2, new CoordinateSystem96Well()),
    content: 'Some text',
  },
  {
    coordinate: new Coordinate('C', 2, new CoordinateSystem96Well()),
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
    coordinate: Coordinate.fromPosition(
      well,
      'row',
      new CoordinateSystem96Well(),
    ),
    content: well,
  }));

const columnFlowData: Array<PlateWell> = new CoordinateSystem96Well()
  .all()
  .map((well) => ({
    coordinate: Coordinate.fromPosition(
      well,
      'column',
      new CoordinateSystem96Well(),
    ),
    content: well,
  }));

const Template: Story<Partial<PlateProps>> = function Template(args) {
  return (
    <Plate
      data={null}
      dndContextProps={{
        onDragEnd: action('onDragEnd'), // dataLocation: `const sourceData = e.active.data.current; const targetData = e.over?.data.current;`
      }}
      {...args}
    />
  );
};

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
