import {
  Input as AntdInput,
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
  InputProps as AntdInputProps,
  InputRef as AntdInputRef,
} from 'antd';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type InputProps = AntdInputProps;
export type InputRef = AntdInputRef;
export type InputNumberProps = AntdInputNumberProps;

export const Input: typeof AntdInput = styled(AntdInput)`
  font-size: ${fontSizeFromTheme};
`;

export const InputNumber: typeof AntdInputNumber = styled(AntdInputNumber)`
  font-size: ${fontSizeFromTheme};
`;
