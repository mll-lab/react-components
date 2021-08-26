import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { AntdDatePicker } from './index';

const ID = 'date-picker';

describe('<AntdDatePicker />', () => {
  it('calls onChange with non-date', async () => {
    const onChange = jest.fn();

    render(
      <AntdDatePicker
        id={ID}
        onChange={(date) => {
          onChange(date);
        }}
      />,
    );

    const datePicker = screen.getByTestId(ID);

    await userEvent.type(datePicker, 'foo');
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.clear(datePicker);

    const inputDate = '01.02.2003';
    await userEvent.type(datePicker, `${inputDate}{enter}`);

    expect(onChange).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByTestId('date-picker')).toHaveValue(inputDate),
    );
  });
});
