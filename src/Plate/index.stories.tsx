import { Story } from '@storybook/react';
import React from 'react';

import { PALETTE } from '../theme';

import {
  COORDINATES_COLUMNS,
  COORDINATES_ROWS,
  Plate,
  PlateProps,
  PlateWell,
} from './index';

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
];

const Template: Story<Partial<PlateProps>> = (args) => (
  <Plate data={null} {...args} />
);
export const Default = Template.bind({});
Default.args = {
  data,
};
/* TODO: delete after https://github.com/storybookjs/storybook/issues/11554 is resolved */
Default.parameters = {
  docs: {
    source: {
      code: 'Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554',
    },
  },
};
