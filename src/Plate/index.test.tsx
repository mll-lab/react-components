import { render } from '@testing-library/react';
import React from 'react';

import { COORDINATE_SYSTEM_12X8 } from './coordinateSystem12x8';

import { Plate } from './index';

describe('Plate', () => {
  it('renders without data', () => {
    render(<Plate data={null} coordinateSystem={COORDINATE_SYSTEM_12X8} />);
  });
});
