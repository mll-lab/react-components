import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { MasterMix, MasterMixIngredients } from './index';

describe('MasterMix component', () => {
  const ingredients: MasterMixIngredients = [
    { key: 1, title: 'Water', volume: 79.5 },
    { key: 2, title: 'Primer F', volume: 9.2 },
    { key: 3, title: 'Primer R', volume: 9 },
    { key: 4, title: 'Probe', volume: 2.5 },
  ];
  const name = '20x Primer/Probe Mix';
  const count = 7;

  it('renders with the given name and count', () => {
    render(<MasterMix name={name} count={count} ingredients={ingredients} />);

    expect(screen.getByText(`${name} MasterMix`)).toBeInTheDocument();
    expect(screen.getByText(`${count}x Ansätze + 2x (PV)`)).toBeInTheDocument();
  });

  it('renders the ingredients with the correct volume and sum', () => {
    render(<MasterMix name="Test" count={count} ingredients={ingredients} />);

    ingredients.forEach((ingredient) => {
      expect(
        screen.getByText(`${ingredient.volume.toFixed(1)} µl`),
      ).toBeInTheDocument();
    });

    const totalVolume = (
      ingredients.reduce((sum, ingredient) => sum + ingredient.volume, 0) *
      (count + 2)
    ).toFixed(1);
    expect(totalVolume === '901.8').toBeTruthy();
    expect(screen.getByText(`${totalVolume} µl`)).toBeInTheDocument();
  });

  it('highlights the clicked ingredient but not the sum', () => {
    render(<MasterMix name="Test" count={1} ingredients={ingredients} />);

    const numberOfSelectedTableRows = () =>
      screen
        .getAllByRole('row')
        .filter((row) => row.classList.contains('mll-ant-table-row-selected'))
        .length;

    expect(numberOfSelectedTableRows()).toBe(0);

    fireEvent.click(screen.getByText('Gesamtvolumen'));
    expect(numberOfSelectedTableRows()).toBe(0);

    fireEvent.click(screen.getByText('Water'));
    expect(numberOfSelectedTableRows()).toBe(1);

    fireEvent.click(screen.getByText('Probe'));
    expect(numberOfSelectedTableRows()).toBe(2);

    fireEvent.click(screen.getByText('Probe'));
    expect(numberOfSelectedTableRows()).toBe(1);
  });
});
