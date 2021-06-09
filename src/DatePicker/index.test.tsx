import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DatePicker } from './index';

describe('<DatePicker />', () => {
  it('should open the popup', async () => {
    const { getByTestId, container } = render(
      <DatePicker onChange={() => {}} />,
    );

    const datePicker = getByTestId('date-picker');
    expect(container.querySelector('.react-datepicker-popper')).toBeFalsy();

    await userEvent.click(datePicker);
    await waitFor(() =>
      expect(container.querySelector('.react-datepicker-popper')).toBeTruthy(),
    );
  });

  it('calls onChange with non-date', async () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <DatePicker onChange={(date) => onChange(date)} />,
    );

    const datePicker = getByTestId('date-picker');

    await userEvent.type(datePicker, 'foo');
    expect(onChange).not.toHaveBeenCalled();

    await userEvent.clear(datePicker);
    expect(onChange).toHaveBeenCalledWith(null);

    const inputValue = '01.02.2003';
    await userEvent.type(datePicker, inputValue);
    expect(onChange).toHaveBeenLastCalledWith(new Date(2003, 1, 1));
    await waitFor(() =>
      expect(getByTestId('date-picker')).toHaveValue(inputValue),
    );
  });
});
