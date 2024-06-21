import React from 'react';
import {
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';

import { DatePicker, DatePickerProps } from '../DatePicker';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type DatePickerFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: DatePickerProps;
  };

export function DatePickerField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: DatePickerFieldProps<TFieldValues, TName>) {
  const { field: { ref, ...fieldProps } } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <DatePicker disabled={disabled} {...fieldProps} {...component} />
    </FieldWrapper>
  );
}
