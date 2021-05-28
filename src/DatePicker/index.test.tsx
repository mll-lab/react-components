import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DatePicker from './index';

describe('<DatePicker />', () => {
  it('should open the popup', () => {
    const { getByTestId, container } = render(
      <DatePicker onChange={() => {}} />,
    );

    const datePicker = getByTestId('date-picker');

    expect(container.querySelector('.react-datepicker-popper')).toBeFalsy();

    userEvent.click(datePicker);

    expect(container.querySelector('.react-datepicker-popper')).toBeTruthy();
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

    await userEvent.type(datePicker, '01.02.2003');
    expect(onChange).toHaveBeenLastCalledWith(new Date(2003, 1, 1));
  });
});
