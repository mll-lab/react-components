import { render, screen } from '@testing-library/react';
import React from 'react';

import { pipettingLossTableColumn } from './pipettingLossTableColumn';

describe('pipettingLossTableColumn', () => {
  describe('with "absolute" pipetting loss type', () => {
    it('should render the total volume and title correctly', () => {
      const column = pipettingLossTableColumn({
        count: 2,
        pipettingLoss: { type: 'absolute', count: 1 },
      });
      render(<>{column.render(null, { volume: 10, title: '', key: 1 }, 1)}</>);
      render(<>{column.title}</>);

      expect(screen.getByText('30.0 µl')).toBeInTheDocument();
      expect(screen.getByText('2x Ansätze + 1x (PV)')).toBeInTheDocument();
    });
  });

  describe('with "factor" pipetting loss type', () => {
    it('should render the total volume and title correctly', () => {
      const column = pipettingLossTableColumn({
        count: 2,
        pipettingLoss: { type: 'factor', factor: 0.1 },
      });
      render(<>{column.render(null, { volume: 10, title: '', key: 1 }, 1)}</>);
      render(<>{column.title}</>);

      expect(screen.getByText('30.0 µl')).toBeInTheDocument();
      expect(screen.getByText('2x Ansätze + 10% (PV)')).toBeInTheDocument();
    });
  });

  describe('with "factorWithMinimum" pipetting loss type', () => {
    it('should use minimum positions when factor loss is slightly below minimum positions', () => {
      // 19 ansätze × 10µl = 190µl
      // factor loss: ceil(19 × 10%) = ceil(1.9) = 2 positions × 10µl = 20µl
      // min positions loss: 2 × 10µl = 20µl
      // result: 190µl + max(20µl, 20µl) = 210µl
      const column = pipettingLossTableColumn({
        count: 19,
        pipettingLoss: {
          type: 'factorWithMinimum',
          factor: 0.1,
          minPositions: 2,
        },
      });
      render(<>{column.title}</>);
      render(<>{column.render(null, { volume: 10, title: '', key: 1 }, 1)}</>);

      expect(screen.getByText('210.0 µl')).toBeInTheDocument();
      expect(screen.getByText('19x Ansätze + 2x (PV)')).toBeInTheDocument();
    });

    it('should use factor loss when it is slightly above minimum positions', () => {
      // 21 ansätze × 10µl = 210µl
      // factor loss: ceil(21 × 10%) = ceil(2.1) = 3 positions × 10µl = 30µl
      // min positions loss: 2 × 10µl = 20µl
      // result: 210µl + max(30µl, 20µl) = 240µl
      const column = pipettingLossTableColumn({
        count: 21,
        pipettingLoss: {
          type: 'factorWithMinimum',
          factor: 0.1,
          minPositions: 2,
        },
      });
      render(<>{column.title}</>);
      render(<>{column.render(null, { volume: 10, title: '', key: 1 }, 1)}</>);

      expect(screen.getByText('240.0 µl')).toBeInTheDocument();
      expect(screen.getByText('21x Ansätze + 10% (PV)')).toBeInTheDocument();
    });
  });
});
