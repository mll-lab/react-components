import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { MasterMixIngredient } from './types';

import { MasterMix } from './index';

describe('MasterMix', () => {
  const ingredients: Array<MasterMixIngredient> = [
    { key: 1, title: 'Water', volume: 79.5 },
    { key: 2, title: 'Primer F', volume: 9.2 },
    { key: 3, title: 'Primer R', volume: 9 },
    { key: 4, title: 'Probe', volume: 2.5 },
  ];
  const name = '20x Primer/Probe Mix';
  const count = 7;

  it('renders with the given name and count', () => {
    render(
      <MasterMix
        name={name}
        count={count}
        ingredients={ingredients}
        pipettingLoss={{ type: 'absolute', count: 2 }}
      />,
    );

    expect(screen.getByText(`${name} MasterMix`)).toBeInTheDocument();
    expect(screen.getByText(`${count}x Ansätze + 2x (PV)`)).toBeInTheDocument();
  });

  it('renders each ingredient volume and their sum', () => {
    render(
      <MasterMix
        name="Test"
        count={count}
        ingredients={ingredients}
        pipettingLoss={{ type: 'absolute', count: 2 }}
      />,
    );

    expect(screen.getByText('79.5 µl')).toBeInTheDocument();
    expect(screen.getByText('9.2 µl')).toBeInTheDocument();
    expect(screen.getByText('9.0 µl')).toBeInTheDocument();
    expect(screen.getByText('2.5 µl')).toBeInTheDocument();
    expect(screen.getByText('100.2 µl')).toBeInTheDocument();
    expect(screen.getByText('901.8 µl')).toBeInTheDocument();
  });

  it('renders as reaction mix containing the master mix', () => {
    render(
      <MasterMix
        name={name}
        count={count}
        ingredients={ingredients}
        perReactionIngredients={[{ key: 5, title: 'cDNA', volume: 5 }]}
        pipettingLoss={{ type: 'absolute', count: 2 }}
      />,
    );

    expect(screen.getByText(`${name} Reaktionsmix`)).toBeInTheDocument();
    expect(screen.getByText('MasterMix')).toBeInTheDocument();
  });

  it('excludes per reaction ingredients from the master mix', () => {
    render(
      <MasterMix
        name="Test"
        count={count}
        ingredients={ingredients}
        perReactionIngredients={[{ key: 5, title: 'cDNA', volume: 5 }]}
        pipettingLoss={{ type: 'absolute', count: 2 }}
      />,
    );

    expect(screen.getByText('100.2 µl')).toBeInTheDocument();
    expect(screen.getByText('901.8 µl')).toBeInTheDocument();
    expect(screen.getByText('105.2 µl')).toBeInTheDocument();
    expect(screen.getAllByText('–')).toHaveLength(2);
  });

  it('omits the reaction volume without per reaction ingredients', () => {
    render(
      <MasterMix
        name="Test"
        count={count}
        ingredients={ingredients}
        pipettingLoss={{ type: 'absolute', count: 2 }}
      />,
    );

    expect(screen.queryByText('Reaktionsvolumen')).not.toBeInTheDocument();
  });

  it('marks the clicked ingredient as pipetted but not the sum', () => {
    render(
      <MasterMix
        name="Test"
        count={1}
        ingredients={ingredients}
        pipettingLoss={{ type: 'absolute', count: 2 }}
      />,
    );

    const numberOfPipettedIngredients = () =>
      screen.queryAllByTitle('pipettiert').length;

    expect(numberOfPipettedIngredients()).toBe(0);

    fireEvent.click(screen.getByText('Gesamtvolumen'));
    expect(numberOfPipettedIngredients()).toBe(0);

    fireEvent.click(screen.getByText('Water'));
    expect(numberOfPipettedIngredients()).toBe(1);

    fireEvent.click(screen.getByText('Probe'));
    expect(numberOfPipettedIngredients()).toBe(2);

    fireEvent.click(screen.getByText('Probe'));
    expect(numberOfPipettedIngredients()).toBe(1);
  });

  it('does not mark per reaction ingredients as pipetted', () => {
    render(
      <MasterMix
        name="Test"
        count={1}
        ingredients={ingredients}
        perReactionIngredients={[{ key: 5, title: 'cDNA', volume: 5 }]}
        pipettingLoss={{ type: 'absolute', count: 2 }}
      />,
    );

    fireEvent.click(screen.getByText('cDNA'));

    expect(screen.queryAllByTitle('pipettiert')).toHaveLength(0);
  });

  it('shows only the volumes of a single reaction in recipe mode', () => {
    render(
      <MasterMix
        name={name}
        mode="recipe"
        ingredients={ingredients}
        perReactionIngredients={[{ key: 5, title: 'cDNA', volume: 5 }]}
      />,
    );

    expect(screen.getByText('100.2 µl')).toBeInTheDocument();
    expect(screen.getByText('105.2 µl')).toBeInTheDocument();
    expect(screen.queryByText(/Ansätze/)).not.toBeInTheDocument();
  });

  it('does not mark ingredients as pipetted in recipe mode', () => {
    render(<MasterMix name="Test" mode="recipe" ingredients={ingredients} />);

    fireEvent.click(screen.getByText('Water'));

    expect(screen.queryAllByTitle('pipettiert')).toHaveLength(0);
  });
});
