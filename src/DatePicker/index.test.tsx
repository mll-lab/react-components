import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DatePicker } from './index';

const ID = 'date-picker';

describe('<DatePicker />', () => {
  it('should open the popup', async () => {
    render(<DatePicker id={ID} onChange={() => {}} />);

    const datePicker = screen.getByTestId(ID);
    expect(screen.queryByText('Previous Month')).toBe(null);

    await userEvent.click(datePicker);
    await waitFor(() =>
      expect(screen.getByText('Previous Month')).toBeVisible(),
    );
  });

  it('calls onChange with non-date', async () => {
    const onChange = jest.fn();

    render(<DatePicker id={ID} onChange={(date) => onChange(date)} />);

    const datePicker = screen.getByTestId(ID);

    await userEvent.type(datePicker, 'foo');
    expect(onChange).not.toHaveBeenCalled();

    await userEvent.clear(datePicker);
    expect(onChange).toHaveBeenCalledWith(null);

    const inputValue = '01.02.2003';
    await userEvent.type(datePicker, inputValue);
    expect(onChange).toHaveBeenLastCalledWith(new Date(2003, 1, 1));
    await waitFor(() =>
      expect(screen.getByTestId('date-picker')).toHaveValue(inputValue),
    );
  });
});
