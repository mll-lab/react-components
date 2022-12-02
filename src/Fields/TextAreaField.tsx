import React from 'react';
import { FieldValues, UseControllerProps, FieldPath } from 'react-hook-form';

import { Input, TextAreaProps } from '../Input';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';
import { useCustomController } from './useCustomController';

type TextAreaFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: TextAreaProps;
  };

export function TextAreaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: TextAreaFieldProps<TFieldValues, TName>) {
  const { field } = useCustomController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <Input.TextArea
        {...field}
        value={field.value ?? undefined}
        disabled={disabled}
        {...component}
      />
    </FieldWrapper>
  );
}
