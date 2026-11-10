import { BaseOptionType, DefaultOptionType } from 'antd/es/select';
import { SelectHandler } from 'rc-select/lib/Select';
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

type SelectedValue<TValue> = TValue extends ReadonlyArray<infer TElement>
  ? TElement
  : NonNullable<TValue>;

// Mirrors rc-select, so handlers typed by antd's SelectProps stay assignable
type ArrayElementType<TValue> = TValue extends Array<infer TElement>
  ? TElement
  : TValue;

// TODO drop the ArrayElementType handlers in the next major release
type SelectFieldHandler<
  TFieldValue,
  TOption extends BaseOptionType | DefaultOptionType,
> =
  | SelectHandler<SelectedValue<TFieldValue>, TOption>
  | SelectHandler<ArrayElementType<TFieldValue>, TOption>;

type SelectFieldComponentProps<
  TFieldValue,
  TOption extends BaseOptionType | DefaultOptionType,
> = Omit<SelectProps<TFieldValue, TOption>, 'onSelect' | 'onDeselect'> & {
  onSelect?: SelectFieldHandler<TFieldValue, TOption>;
  onDeselect?: SelectFieldHandler<TFieldValue, TOption>;
};

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption extends BaseOptionType | DefaultOptionType,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: SelectFieldComponentProps<
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
  type FieldValue = UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
  type SelectedFieldValue = SelectedValue<FieldValue> &
    ArrayElementType<FieldValue>;

  const {
    field: { onChange, ...fieldProps },
  } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();
  const { onSelect, onDeselect, ...selectProps } = component ?? {};

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
        {...selectProps}
        // rc-select types these with the field value, but calls them with a single option value
        onSelect={
          onSelect &&
          ((value, option) => onSelect(value as SelectedFieldValue, option))
        }
        onDeselect={
          onDeselect &&
          ((value, option) => onDeselect(value as SelectedFieldValue, option))
        }
      />
    </FieldWrapper>
  );
}
