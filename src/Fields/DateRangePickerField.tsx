import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import React from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';
import { CALENDAR_LOCALE } from './calendarLocale';

const { RangePicker } = DatePicker;

type DateRangePickerFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: RangePickerProps;
  };

export function DateRangePickerField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: DateRangePickerFieldProps<TFieldValues, TName>) {
  const { field } = useController<TFieldValues, TName>(controller);
  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <RangePicker
        format={['DD.MM.YYYY', 'DDMMYYYY']}
        locale={CALENDAR_LOCALE}
        {...field}
        {...component}
      />
    </FieldWrapper>
  );
}
