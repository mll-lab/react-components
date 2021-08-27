import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DateFnsDatePicker } from './index';

const ID = 'date-picker';

describe('<DateFnsDatePicker />', () => {
  it('calls onChange', async () => {
    const onChange = jest.fn();

    render(
        <DateFnsDatePicker
            id={ID}
            onChange={(date) => {
              onChange(date);
            }}
        />,
    );

    const datePicker = screen.getByTestId(ID);

    await userEvent.type(datePicker, 'foo{enter}');
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.clear(datePicker);

    const inputDate = '01.02.2003';
    await userEvent.type(datePicker, `${inputDate}{enter}`);
    expect(onChange).toHaveBeenLastCalledWith(new Date(2003, 1, 1));
    await waitFor(() =>
        expect(screen.getByTestId('date-picker')).toHaveValue(inputDate),
    );
    await userEvent.clear(datePicker);

    const dotlessInput = '01022003';
    await userEvent.type(datePicker, `${dotlessInput}{enter}`);
    expect(onChange).toHaveBeenLastCalledWith(new Date(2003, 1, 1));
    await waitFor(() =>
        expect(screen.getByTestId('date-picker')).toHaveValue(inputDate),
    );
  });
});
