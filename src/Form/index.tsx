import { Form as AntdForm, FormProps as AntdFormProps } from 'antd';
import { FormItemProps as AntdFormItemProps } from 'antd/es/form/';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type FormProps<T> = AntdFormProps<T>;
export type FormItemProps<T> = AntdFormItemProps<T>;

const StyledForm = styled(AntdForm)<FormProps<unknown>>`
  font-size: ${fontSizeFromTheme};
  & label {
    font-size: revert;
  }
`;

const StyledFormItem = styled(StyledForm.Item)<FormItemProps<unknown>>`
  font-size: ${fontSizeFromTheme};
  & > label {
    font-size: revert;
  }
`;

export const Form: typeof AntdForm = StyledForm;

Form.Item = StyledFormItem;
