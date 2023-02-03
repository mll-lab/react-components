import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { MasterMix } from './index';

describe('MasterMix component', () => {
  const ingredients = [
    { key: 1, title: 'Water', volume: 79.5 },
    { key: 2, title: 'Primer F', volume: 9.2 },
    { key: 3, title: 'Primer R', volume: 9 },
    { key: 4, title: 'Probe', volume: 2.5 },
  ];
  const name = '20x Primer/Probe Mix';
  const count = 7;

  it('renders with the given name and count', () => {
    const { getByText } = render(
      <MasterMix name={name} count={count} ingredients={ingredients} />,
    );

    expect(getByText(`${name} MasterMix`)).toBeInTheDocument();
    expect(getByText(`${count}x Ansätze + 2x (PV)`)).toBeInTheDocument();
  });

  it('renders the ingredients with the correct volume and sum', () => {
    const { getByText } = render(
      <MasterMix name="Test" count={count} ingredients={ingredients} />,
    );

    ingredients.forEach((ingredient) => {
      expect(
        getByText(`${ingredient.volume.toFixed(1)} µl`),
      ).toBeInTheDocument();
    });

    const totalVolume = (
      ingredients.reduce((a, b) => a + b.volume, 0) *
      (count + 2)
    ).toFixed(1);
    expect(totalVolume === '901.8').toBeTruthy();
    expect(getByText(`${totalVolume} µl`)).toBeInTheDocument();
  });

  it('highlights the clicked ingredient but not the sum', () => {
    const { getByText, container } = render(
      <MasterMix name="Test" count={1} ingredients={ingredients} />,
    );

    expect(
      container.getElementsByClassName('mll-ant-table-row-selected').length,
    ).toBe(0);

    fireEvent.click(getByText('Gesamtvolumen'));

    expect(
      container.getElementsByClassName('mll-ant-table-row-selected').length,
    ).toBe(0);

    fireEvent.click(getByText('Water'));

    expect(
      container.getElementsByClassName('mll-ant-table-row-selected').length,
    ).toBe(1);
  });
});
