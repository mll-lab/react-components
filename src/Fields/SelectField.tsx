import React from 'react';
import {
  useController,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';

import { OptionType, GroupedOptionType, Select, SelectProps } from '../Select';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
  TFieldPathValue extends FieldPathValue<TFieldValues, TFieldPath>,
  TOption extends
    | OptionType<TFieldPathValue>
    | GroupedOptionType<TFieldPathValue>,
> = UseControllerProps<TFieldValues, TFieldPath> &
  Pick<FieldWrapperProps<TFieldValues, TFieldPath>, 'formItem'> & {
    component?: SelectProps<TFieldPathValue, TOption>;
  };

export function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TFieldPath extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TFieldPathValue extends FieldPathValue<
    TFieldValues,
    TFieldPath
  > = FieldPathValue<TFieldValues, TFieldPath>,
  TOption extends
    | OptionType<TFieldPathValue>
    | GroupedOptionType<TFieldPathValue> = OptionType<TFieldPathValue>,
>({
  formItem,
  component,
  ...controller
}: SelectFieldProps<TFieldValues, TFieldPath, TFieldPathValue, TOption>) {
  const {
    field: { onChange, ...fieldProps },
  } = useController<TFieldValues, TFieldPath>(controller);

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
