import { render } from '@testing-library/react';
import React from 'react';

import { COORDINATE_SYSTEM_96_WELL } from './coordinateSystem96Well';

import { Plate } from './index';

describe('Plate', () => {
  it('renders without data', () => {
    render(<Plate data={null} coordinateSystem={COORDINATE_SYSTEM_96_WELL} />);
  });
});
