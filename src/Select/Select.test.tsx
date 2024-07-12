// TODO remove when we can upgrade to @testing-library/user-event:14, which currently does not work in this test
/* eslint-disable @typescript-eslint/await-thenable */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Select } from './index';

describe('<Select />', () => {
  it('renders and calls onChange', async () => {
    const onChange = jest.fn();

    const valueA = 'a';
    const labelA = 'some label for a';
    const optionA = { value: valueA, label: labelA };
    render(<Select options={[optionA, { value: 'b' }]} onChange={onChange} />);

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText(labelA));
    expect(onChange).toHaveBeenCalledWith(valueA, optionA);
  });
});
