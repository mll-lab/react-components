import { Input as AntdInput, InputNumber as AntdInputNumber } from 'antd';
import { InputProps as AntdInputProps } from 'antd/lib/input';
import { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';

export const Input: typeof AntdInput = AntdInput;
export const InputNumber: typeof AntdInputNumber = AntdInputNumber;
export type InputProps = AntdInputProps;
export type InputNumberProps = AntdInputNumberProps;
