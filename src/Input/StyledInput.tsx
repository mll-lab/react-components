import { Input as AntdInput, InputNumber as AntdInputNumber } from 'antd';
import { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';
import { InputProps as AntdInputProps } from 'antd/lib/input/Input';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type InputProps = AntdInputProps;

export type InputNumberProps = AntdInputNumberProps;

export const Input = styled(AntdInput)`
  font-size: ${fontSizeFromTheme};
`;

export const InputNumber = styled(AntdInputNumber)`
  font-size: ${fontSizeFromTheme};
`;
