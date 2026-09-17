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
    expect(screen.getByText('0.03')).toHaveStyle({
      left: 'calc(100% - 17.5px)',
    });
  });

  it('labels a mean that needs more decimals than its bounds', () => {
    render(
      <RangeWithValue
        expectedMin={0.04}
        expectedMax={0.15}
        actualValue={0.1}
        rangeType="closed"
        showMean
      />,
    );

    expect(screen.getByText('0.095')).toBeVisible();
  });

  it('labels the geometric mean of a multiplicatively derived range', () => {
    render(
      <RangeWithValue
        expectedMin={0.038}
        expectedMax={0.152}
        actualValue={0.1}
        rangeType="closed"
        showMean
        scale="logarithmic"
      />,
    );

    expect(screen.getByText('0.076')).toBeVisible();
    expect(screen.queryByText('0.095')).not.toBeInTheDocument();
  });

  it('centers the mean of a logarithmic scale', () => {
    render(
      <RangeWithValue
        expectedMin={1}
        expectedMax={100}
        actualValue={20}
        rangeType="closed"
        bufferPercentage={0}
        showMean
        scale="logarithmic"
      />,
    );

    expect(screen.getByText('10')).toHaveStyle({ left: '50%' });
  });

  it('places a value by its ratio to the bounds on a logarithmic scale', () => {
    render(
      <RangeWithValue
        expectedMin={1}
        expectedMax={100}
        actualValue={10}
        rangeType="closed"
        bufferPercentage={0}
        scale="logarithmic"
      />,
    );

    expect(screen.getByText('10')).toHaveStyle({
      left: 'calc(50% - 12.5px)',
    });
  });

  it('places a value by its distance to the bounds on a linear scale', () => {
    render(
      <RangeWithValue
        expectedMin={1}
        expectedMax={100}
        actualValue={10}
        rangeType="closed"
        bufferPercentage={0}
      />,
    );

    expect(screen.getByText('10')).toHaveStyle({
      left: 'calc(9.090909090909092% - 12.5px)',
    });
  });

  it('refuses a logarithmic scale for a lower bound of zero', () => {
    render(
      <RangeWithValue
        expectedMin={0}
        expectedMax={0.002}
        actualValue={0.001}
        rangeType="closed"
        showMean
        scale="logarithmic"
      />,
    );

    expect(
      screen.getByText(
        'Keine logarithmische Skala für Werte kleiner oder gleich null: 0',
        {
          exact: false,
        },
      ),
    ).toBeVisible();
  });

  it('centers a range that collapses onto the value', () => {
    render(
      <RangeWithValue
        expectedMin={0.029}
        expectedMax={0.029}
        actualValue={0.029}
        rangeType="open-ended"
      />,
    );

    expect(screen.getByText('= 0.029')).toHaveStyle({ left: '50%' });
  });

  it('refuses to call a missing measurement in range', () => {
    render(
      <RangeWithValue
        expectedMin={0.04}
        expectedMax={0.15}
        actualValue={NaN}
        rangeType="closed"
      />,
    );

    expect(
      screen.getByText('Keine gültigen Zahlenwerte: 0.04 / 0.15 / NaN', {
        exact: false,
      }),
    ).toBeVisible();
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
