import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { PREFIX_CLS } from '../Provider';

import { Table } from './index';

const testId = '123';
const FilterDropdown = () => <span data-testid={testId}>test</span>;

describe('Table', () => {
  // We are not rendering those elements at once
  // eslint-disable-next-line react/jsx-key
  it.each([<span data-testid={testId}>test</span>, FilterDropdown])(
    'uses and an ant-mll class on filterDropdown',
    (filterDropdown) => {
      render(
        <Table
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              filterDropdown,
            },
          ]}
        />,
      );
      expect(screen.queryByTestId(testId)).toBeNull();

      // click the button to render the dropdown
      userEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId(testId).closest('div')).toHaveClass(PREFIX_CLS);
    },
  );
});
