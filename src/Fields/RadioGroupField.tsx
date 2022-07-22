import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';

import { Radio, RadioGroupProps } from '../Radio';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type RadioGroupFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: RadioGroupProps;
  };

export function RadioGroupField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: RadioGroupFieldProps<TFieldValues, TName>) {
  const { field } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <Radio.Group
        {...field}
        value={field.value ?? undefined}
        disabled={disabled}
        {...component}
      />
    </FieldWrapper>
  );
}
