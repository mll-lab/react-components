import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DatePicker } from './index';

const ID = 'date-picker';

describe('<DatePicker />', () => {
  it('is not called on invalid inputs', async () => {
    const onChange = jest.fn();

    render(
      <DatePicker
        id={ID}
        onChange={(date) => {
          onChange(date);
        }}
      />,
    );

    const datePicker = screen.getByTestId(ID);

    await userEvent.type(datePicker, 'foo{enter}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('is called with valid input', async () => {
    const onChange = jest.fn();

    render(
      <DatePicker
        id={ID}
        onChange={(date) => {
          onChange(date);
        }}
      />,
    );

    const datePicker = screen.getByTestId(ID);

    const inputDate = '01.02.2003';
    await userEvent.type(datePicker, `${inputDate}{enter}`);
    expect(onChange).toHaveBeenLastCalledWith(new Date(2003, 1, 1));
    await waitFor(() =>
      expect(screen.getByTestId('date-picker')).toHaveValue(inputDate),
    );
  });

  it('is cleared with valid input', async () => {
    const onChange = jest.fn();

    render(
      <DatePicker
        id={ID}
        value={new Date(2003, 1, 1)}
        onChange={(date) => {
          onChange(date);
        }}
      />,
    );

    const clear = screen.getByLabelText('close-circle');
    userEvent.click(clear);
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('is called with dotless input', async () => {
    const onChange = jest.fn();

    render(
      <DatePicker
        id={ID}
        onChange={(date) => {
          onChange(date);
        }}
      />,
    );

    const datePicker = screen.getByTestId(ID);

    const dotlessInput = '01022003';
    await userEvent.type(datePicker, `${dotlessInput}{enter}`);
    expect(onChange).toHaveBeenLastCalledWith(new Date(2003, 1, 1));
    await waitFor(() =>
      expect(screen.getByTestId('date-picker')).toHaveValue('01.02.2003'),
    );
  });
});
