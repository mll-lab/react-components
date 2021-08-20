import {
  Form as AntdForm,
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
} from 'antd';

export const Form: typeof AntdForm = AntdForm;
export type FormProps<T> = AntdFormProps<T>;
export type FormItemProps<T> = AntdFormItemProps<T>;
