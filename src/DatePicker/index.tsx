import {
  GERMAN_DATE_FORMAT,
  GERMAN_DATE_TIME_FORMAT,
  parseGermanDateFlexible,
  MINIMAL_VALID_DATE,
} from '@mll-lab/js-utils';
import { addYears } from 'date-fns';
import localeDe from 'date-fns/locale/de';
import React from 'react';
import {
  ReactDatePickerProps,
  registerLocale,
  setDefaultLocale,
} from 'react-datepicker';

import { StyledDatePicker } from './StyledDatePicker';

registerLocale('de', localeDe);
setDefaultLocale('de');

export type DatePickerProps = Omit<ReactDatePickerProps, 'onChangeRaw'>;

export function DatePicker(props: DatePickerProps) {
  return (
    <StyledDatePicker
      {...props}
      showYearDropdown
      showMonthDropdown
      scrollableYearDropdown
      minDate={MINIMAL_VALID_DATE}
      maxDate={addYears(new Date(), 1)}
      yearDropdownItemNumber={50}
      timeCaption="Zeit"
      dateFormat={
        props.showTimeSelect ? GERMAN_DATE_TIME_FORMAT : GERMAN_DATE_FORMAT
      }
      // We can only control how the DatePicker formats dates, but not how it parses
      // keyboard input. We can listen to the raw change events and attempt to parse
      // a date out of the input ourselves
      onChangeRaw={(event) => {
        const rawInput = event.target.value;

        // Allow clearing the date
        if (rawInput === '') {
          props.onChange(null, event);

          return;
        }

        // Only propagate the change if the user actually entered a valid date
        const inputDate = parseGermanDateFlexible(rawInput);
        if (inputDate) {
          props.onChange(inputDate, event);
        }
      }}
      onChange={(date, event) => {
        // The user actually used the date picker to select a date.
        if (event?.type === 'click') {
          // In this case, we know the input is a valid, unambiguous date instance,
          // so we just pass it as is.
          props.onChange(date, event);
        } else {
          // Do nothing, this case is handled by onChangeRaw
        }
      }}
    />
  );
}
