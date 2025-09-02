import React, { ReactNode } from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPathValue,
  FieldPath,
} from 'react-hook-form';

import { Form, FormItemProps } from '../Form';

import { useFieldContext } from './FieldProvider';

export type FieldWrapperProps<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> = {
  children: ReactNode;
  controller: UseControllerProps<TFieldValues, TFieldPath>;
  formItem?: FormItemProps<FieldPathValue<TFieldValues, TFieldPath>>;
};

export function FieldWrapper<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>(props: FieldWrapperProps<TFieldValues, TFieldPath>) {
  const { fieldState } = useController<TFieldValues, TFieldPath>(
    props.controller,
  );

  const { formItemProps } = useFieldContext();

  return (
    <Form.Item {...formItemProps(fieldState)} {...props.formItem}>
      {props.children}
    </Form.Item>
  );
}
