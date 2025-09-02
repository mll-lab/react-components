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

  describe('with "factorWithMinimum" pipetting loss type', () => {
    it('should display the correct tooltip content', () => {
      const column = pipettingLossTableColumn({
        count: 3,
        pipettingLoss: {
          type: 'factorWithMinimum',
          factor: 0.1,
          minPositions: 2,
        },
      });
      render(<>{column.title}</>);

      expect(
        screen.getByText('3x Ansätze + 10% (min. 2x) (PV)'),
      ).toBeInTheDocument();
    });

    it('should use minimum positions when factor loss is slightly below minimum positions', () => {
      // 19 ansätze × 10µl = 190µl
      // factor loss: 190µl × 10% = 19µl
      // min positions loss: 2 × 10µl = 20µl
      // result: 190µl + max(19µl, 20µl) = 210µl
      const column = pipettingLossTableColumn({
        count: 19,
        pipettingLoss: {
          type: 'factorWithMinimum',
          factor: 0.1,
          minPositions: 2,
        },
      });
      render(<>{column.render(null, { volume: 10, title: '', key: 1 }, 1)}</>);

      expect(screen.getByText('210.0 µl')).toBeInTheDocument();
    });

    it('should use factor loss when it is slightly above minimum positions', () => {
      // 21 ansätze × 10µl = 210µl
      // factor loss: 210µl × 10% = 21µl
      // min positions loss: 2 × 10µl = 20µl
      // result: 210µl + max(21µl, 20µl) = 231µl
      const column = pipettingLossTableColumn({
        count: 21,
        pipettingLoss: {
          type: 'factorWithMinimum',
          factor: 0.1,
          minPositions: 2,
        },
      });
      render(<>{column.render(null, { volume: 10, title: '', key: 1 }, 1)}</>);

      expect(screen.getByText('231.0 µl')).toBeInTheDocument();
    });
  });
});
