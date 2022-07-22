import { Input } from '@mll-lab/react-components';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';
import { useSelector } from 'react-redux';

import { selectIsAllowedToEdit } from '../../base/EditMode/selectors';

import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

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
  const { field } = useController<TFieldValues, TName>(controller);

  const editable = useSelector(selectIsAllowedToEdit);

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <Input.TextArea
        {...field}
        value={field.value ?? undefined}
        disabled={!editable}
        {...component}
      />
    </FieldWrapper>
  );
}
