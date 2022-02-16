import { Story } from '@storybook/react';
import React from 'react';

import { PALETTE } from '../theme';

import { Plate, PlateProps } from './index';

export default {
  title: 'Plate',
  argTypes: {
    loading: { control: 'boolean' },
  },
};

export const Default: Story<Partial<PlateProps>> = (args) => (
  <Plate
    data={[
      {
        coordinates: { row: 'A', column: 7 },
        content: <i>It renders any ReactNode</i>,
      },
      {
        coordinates: { row: 'A', column: 8 },
        content: 'Test',
        color: PALETTE.red,
      },
      {
        coordinates: { row: 'B', column: 3 },
        content: 'Some text',
      },
    ]}
    {...args}
  />
);
