import React from 'react';
import {
  useController,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseControllerProps,
  UnpackNestedValue,
} from 'react-hook-form';

import { Select, SelectProps } from '../Select';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: SelectProps<
      UnpackNestedValue<FieldPathValue<TFieldValues, TName>>
    >;
  };

export function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: SelectFieldProps<TFieldValues, TName>) {
  const {
    field: { ref, onChange, ...fieldProps },
  } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <Select
        {...fieldProps}
        disabled={disabled}
        placeholder="Bitte auswählen"
        style={{ width: '100%' }}
        // Makes the allowClear method able to actually affect the form value
        // See https://react-hook-form.com/api/usecontroller/controller
        // > Calling onChange with undefined is not valid. You should use null or the empty string as your default/cleared value instead.
        onChange={(value) => onChange(value ?? null)}
        {...component}
      />
    </FieldWrapper>
  );
}
