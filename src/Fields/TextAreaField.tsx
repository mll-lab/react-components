import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';

import { TextArea, TextAreaProps, TextAreaRef } from '../Input';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type TextAreaFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: TextAreaProps & {
      ref?: React.Ref<TextAreaRef>;
    };
  };

export function TextAreaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: TextAreaFieldProps<TFieldValues, TName>) {
  const { field } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <TextArea
        {...field}
        value={field.value ?? undefined}
        disabled={disabled}
        {...component}
        // Avoid losing focus when triggering/resolving a validation error
        // https://4x.ant.design/components/input/#Why-Input-lose-focus-when-change-prefix/suffix/showCount
        showCount={component?.showCount || { formatter: () => '' }}
      />
    </FieldWrapper>
  );
}
