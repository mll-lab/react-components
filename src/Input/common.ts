import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef as AntdInputRef,
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
} from 'antd';
import { TextAreaProps as AntdTextAreaProps } from 'antd/es/input';
import { SearchProps as AntdSearchProps } from 'antd/es/input/Search';
import { TextAreaRef as AntdTextAreaRef } from 'antd/es/input/TextArea';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export const Input: typeof AntdInput = styled(AntdInput)`
  font-size: ${fontSizeFromTheme};
`;
export type InputProps = AntdInputProps;
export type InputRef = AntdInputRef;

export const InputNumber: typeof AntdInputNumber = styled(AntdInputNumber)`
  font-size: ${fontSizeFromTheme};
`;
export type InputNumberProps = AntdInputNumberProps;

export const TextArea: typeof Input.TextArea = styled(Input.TextArea)`
  font-size: ${fontSizeFromTheme};
`;
Input.TextArea = TextArea;
export type TextAreaProps = AntdTextAreaProps;
export type TextAreaRef = AntdTextAreaRef;

export type SearchProps = AntdSearchProps;
