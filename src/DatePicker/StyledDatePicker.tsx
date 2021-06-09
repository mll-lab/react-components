import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import styled from 'styled-components';

// eslint-disable-next-line @mll-lab/no-global-styles
import 'react-datepicker/dist/react-datepicker.css';
import { MLL_THEME } from '../theme';

const StyledDatePickerContainer = styled.div`
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 2;
  }

  .react-datepicker__header__dropdown,
  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker__year-option,
  .react-datepicker__month-option,
  .react-datepicker__month-year-option {
    text-align: center !important;
  }

  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown,
  .react-datepicker__month-year-dropdown {
    background-color: ${MLL_THEME.white} !important;
  }

  .gray-stripes .react-datepicker__week:nth-child(2n + 1) {
    background-color: ${MLL_THEME.menuGroupBackgroundColor};
  }

  .react-datepicker__day-names {
    border-top: 1px dotted ${MLL_THEME.borderColor};
    background: ${MLL_THEME.collapseBackgroundColor};
  }

  .react-datepicker__header {
    border-bottom: 1px dotted ${MLL_THEME.borderColor} !important;
  }
`;

export function StyledDatePicker(props: ReactDatePickerProps) {
  return (
    <StyledDatePickerContainer>
      <DatePicker
        calendarClassName="gray-stripes"
        className="ant-input"
        autoComplete="off"
        {...props}
      />
    </StyledDatePickerContainer>
  );
}
