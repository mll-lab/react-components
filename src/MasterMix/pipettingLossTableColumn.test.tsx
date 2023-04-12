import { render, screen } from '@testing-library/react';
import React from 'react';

import { pipettingLossTableColumn } from './pipettingLossTableColumn';

describe('pipettingLossTableColumn', () => {
  describe('with "absolute" pipetting loss type', () => {
    it('should display the correct tooltip content', () => {
      const column = pipettingLossTableColumn({
        count: 2,
        pipettingLoss: { type: 'absolute', count: 1 },
      });
      render(<>{column.title}</>);

      expect(screen.getByText('2x Ansätze + 1x (PV)')).toBeInTheDocument();
    });

    it('should render the total volume correctly', () => {
      const column = pipettingLossTableColumn({
        count: 2,
        pipettingLoss: { type: 'absolute', count: 1 },
      });
      render(<>{column.render(null, { volume: 10, title: '', key: 1 }, 1)}</>);

      expect(screen.getByText('30.0 µl')).toBeInTheDocument();
    });
  });

  describe('with "factor" pipetting loss type', () => {
    it('should display the correct tooltip content', () => {
      const column = pipettingLossTableColumn({
        count: 2,
        pipettingLoss: { type: 'factor', factor: 0.1 },
      });
      render(<>{column.title}</>);

      expect(screen.getByText('2x Ansätze + 10% (PV)')).toBeInTheDocument();
    });

    it('should render the total volume correctly', () => {
      const column = pipettingLossTableColumn({
        count: 2,
        pipettingLoss: { type: 'factor', factor: 0.1 },
      });
      render(<>{column.render(null, { volume: 10, title: '', key: 1 }, 1)}</>);

      expect(screen.getByText('22.0 µl')).toBeInTheDocument();
    });
  });
});
