import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';

import { Input, InputProps, InputRef } from '../Input';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type InputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: InputProps & {
      ref?: React.Ref<InputRef>;
    };
  };

export function InputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: InputFieldProps<TFieldValues, TName>) {
  const { field } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <Input
        {...field}
        value={field.value ?? undefined}
        disabled={disabled}
        {...component}
        // Avoid losing focus when triggering/resolving a validation error
        // https://4x.ant.design/components/input/#Why-Input-lose-focus-when-change-prefix/suffix/showCount
        suffix={component?.suffix || <span />}
      />
    </FieldWrapper>
  );
}
