import { Form as AntdForm, FormProps as AntdFormProps } from 'antd';
import { FormItemProps as AntdFormItemProps } from 'antd/es/form/';
import React from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type FormProps<T> = AntdFormProps<T>;
export type FormItemProps<T> = AntdFormItemProps<T>;

const StyledForm = styled(AntdForm)`
  font-size: ${fontSizeFromTheme};
` as typeof AntdForm;

const StyledFormItem = styled(StyledForm.Item)`
  font-size: ${fontSizeFromTheme};
  .mll-ant-form-item-label > label {
    font-size: 1em;
  }
` as typeof AntdForm.Item;

export function Form<T = unknown>({ children, ...props }: FormProps<T>) {
  return <StyledForm<T> {...props}>{children}</StyledForm>;
}

function FormItem<T = unknown>({ children, ...props }: FormItemProps<T>) {
  return <StyledFormItem<T> {...props}>{children}</StyledFormItem>;
}

Form.Item = FormItem;
