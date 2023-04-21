import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';

import { Input, InputProps } from '../Input';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';
import styled from 'styled-components';

type StyledInputProps = Omit<InputProps, 'style'> & {
  // TODO handle console warning:
  // React does not recognize the `inputStyle` prop on a DOM element.
  inputStyle: InputProps['style'];
  wrapperStyle: InputProps['style'];
}

type InputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: StyledInputProps;
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
      <StyledInput
        {...field}
        value={field.value ?? undefined}
        disabled={disabled}
        {...component}
        style={component?.wrapperStyle}
        // Avoid losing focus when triggering/resolving a validation error
        // https://4x.ant.design/components/input/#Why-Input-lose-focus-when-change-prefix/suffix/showCount
        suffix={component?.suffix || <span />}
      />
    </FieldWrapper>
  );
}

const StyledInput = styled(Input)`
  .mll-ant-input {
    ${(props) => props.inputStyle}
  }
`;
