import {
  formatGermanNumber,
  parseGermanNumber,
  GERMAN_DECIMAL_SEPARATOR,
} from '@mll-lab/js-utils';
import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';

import { InputNumber, InputNumberProps } from '../Input';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type InputNumberFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: InputNumberProps;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    defaultFieldValue?: string | number;
  };

export function InputNumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  minimumFractionDigits = 0,
  maximumFractionDigits = 6,
  defaultFieldValue = '',
  ...controller
}: InputNumberFieldProps<TFieldValues, TName>) {
  const { field } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <InputNumber
        {...field}
        value={field.value ?? undefined}
        disabled={disabled}
        controls={false}
        formatter={(value, { userTyping, input }) => {
          if (userTyping) {
            return input;
          }

          return formatGermanNumber(value, {
            minimumFractionDigits,
            maximumFractionDigits,
          });
        }}
        parser={(value) => parseGermanNumber(value) ?? defaultFieldValue}
        {...component}
        // Avoid losing focus when triggering/resolving a validation error
        // https://4x.ant.design/components/input/#Why-Input-lose-focus-when-change-prefix/suffix/showCount
        prefix={component?.prefix || <span />}
      />
    </FieldWrapper>
  );
}
