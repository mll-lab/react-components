import { render, screen } from '@testing-library/react';
import React from 'react';

import { RangeWithValue } from './index';

describe('RangeWithValue', () => {
  it('labels a zero-width range once', () => {
    render(
      <RangeWithValue
        expectedMin={0.029}
        expectedMax={0.029}
        actualValue={0.03}
        rangeType="open-ended"
        showMean
      />,
    );

    expect(screen.getAllByText('= 0.029')).toHaveLength(1);
  });

  it('separates the value from a zero-width range it lies outside of', () => {
    render(
      <RangeWithValue
        expectedMin={0.029}
        expectedMax={0.029}
        actualValue={0.03}
        rangeType="open-ended"
        bufferPercentage={0}
      />,
    );

    expect(screen.getByText('= 0.029')).toHaveStyle({ left: '0%' });
  });

  it('centers a range that collapses onto the value', () => {
    const { container } = render(
      <RangeWithValue
        expectedMin={0.029}
        expectedMax={0.029}
        actualValue={0.029}
        rangeType="open-ended"
      />,
    );

    expect(container.innerHTML).not.toContain('NaN');
  });

  it('reports a maximum below the minimum instead of drawing a scale', () => {
    render(
      <RangeWithValue
        expectedMin={0.029}
        expectedMax={0.024}
        actualValue={0.031}
        rangeType="open-ended"
      />,
    );

    expect(
      screen.getByText('Ungültige Grenzwerte: 0.029 ist größer als 0.024', {
        exact: false,
      }),
    ).toBeVisible();
    expect(screen.queryByText('0.031')).not.toBeInTheDocument();
  });
});
