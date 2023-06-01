import { render } from '@testing-library/react';
import React from 'react';

import { Plate } from './index';

describe('Plate', () => {
  it('renders without data', () => {
    render(<Plate data={null} />);
  });
});
