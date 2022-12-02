import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import React from 'react';
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseControllerProps,
  UnpackNestedValue,
} from 'react-hook-form';

import { Select, SelectProps } from '../Select';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';
import { useCustomController } from './useCustomController';

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption extends BaseOptionType | DefaultOptionType,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: SelectProps<
      UnpackNestedValue<FieldPathValue<TFieldValues, TName>>,
      TOption
    >;
  };

export function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>({
  formItem,
  component,
  ...controller
}: SelectFieldProps<TFieldValues, TName, TOption>) {
  const {
    field: { ref, onChange, ...fieldProps },
  } = useCustomController<TFieldValues, TName>(controller);

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
