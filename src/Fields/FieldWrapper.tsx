import React, { ReactNode } from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPathValue,
  FieldPath,
  UnpackNestedValue,
} from 'react-hook-form';

import { Form, FormItemProps } from '../Form';

import { useFieldContext } from './FieldProvider';

export type FieldWrapperProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  children: ReactNode;
  controller: UseControllerProps<TFieldValues, TName>;
  formItem?: FormItemProps<
    UnpackNestedValue<FieldPathValue<TFieldValues, TName>>
  >;
};

export function FieldWrapper<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FieldWrapperProps<TFieldValues, TName>) {
  const { fieldState } = useController<TFieldValues, TName>(props.controller);

  const { formItemProps } = useFieldContext();

  return (
    <Form.Item {...formItemProps(fieldState)} {...props.formItem}>
      {props.children}
    </Form.Item>
  );
}
