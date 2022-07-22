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

  return (
    <Form.Item
      // hasFeedback={fieldState.invalid} TODO uncomment when antd3 has been removed from limes-frontend
      validateStatus={fieldState.invalid ? 'error' : undefined}
      help={fieldState.error?.message}
      {...props.formItem}
    >
      {props.children}
    </Form.Item>
  );
}
