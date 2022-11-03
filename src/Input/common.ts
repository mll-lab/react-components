import {
  Input as AntdInput,
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
  InputProps as AntdInputProps,
  InputRef as AntdInputRef,
} from 'antd';
import { TextAreaProps as AntdTextAreaProps } from 'antd/es/input';
import { TextAreaRef as AntdTextAreaRef } from 'antd/es/input/TextArea';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type InputProps = AntdInputProps;
export type TextAreaProps = AntdTextAreaProps;
export type InputRef = AntdInputRef;
export type TextAreaRef = AntdTextAreaRef;
export type InputNumberProps = AntdInputNumberProps;

export const Input: typeof AntdInput = styled(AntdInput)`
  font-size: ${fontSizeFromTheme};
`;

export const InputNumber: typeof AntdInputNumber = styled(AntdInputNumber)`
  font-size: ${fontSizeFromTheme};
`;

export const TextArea: typeof Input.TextArea = styled(Input.TextArea)`
  font-size: ${fontSizeFromTheme};
`;

Input.TextArea = TextArea;
