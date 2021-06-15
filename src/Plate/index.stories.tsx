import { Story } from '@storybook/react';
import React from 'react';

import { Plate, PlateProps } from './index';

export default {
  title: 'Plate',
};

export const Default: Story<Partial<PlateProps>> = (args) => (
  <Plate
    data={[
      {
        coordinates: { row: 'A', column: 8 },
        content: 'Test',
        selected: true,
      },
      {
        coordinates: { row: 'A', column: 7 },
        content: <i>Is also renders a ReactNode</i>,
      },
    ]}
    {...args}
  />
);
