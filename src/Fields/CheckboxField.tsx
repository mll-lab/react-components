import React, { PropsWithChildren } from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';

import { Checkbox, CheckboxProps } from '../Checkbox';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> &
  PropsWithChildren<{
    component?: CheckboxProps;
  }>;

export function CheckboxField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  children,
  ...controller
}: CheckboxFieldProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, ...field },
  } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <Checkbox
        {...field}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
        checked={value}
        disabled={disabled}
        {...component}
      >
        {children}
      </Checkbox>
    </FieldWrapper>
  );
}
