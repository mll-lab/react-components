import {
  Input as AntdInput,
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
  InputProps as AntdInputProps,
} from 'antd';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type InputProps = AntdInputProps;
export type InputNumberProps = AntdInputNumberProps;

export const Input: typeof AntdInput = styled(AntdInput)`
  font-size: ${fontSizeFromTheme};
`;

export const InputNumber = styled(AntdInputNumber)`
  font-size: ${fontSizeFromTheme};
`;
