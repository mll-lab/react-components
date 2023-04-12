import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';

import { Switch, SwitchProps } from '../Switch';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type SwitchFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: SwitchProps;
  };

export function SwitchField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: SwitchFieldProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, ...field },
  } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <Switch
        {...field}
        onChange={(checked) => {
          onChange(checked);
        }}
        checked={value}
        disabled={disabled}
        {...component}
      />
    </FieldWrapper>
  );
}
