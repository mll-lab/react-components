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
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled, { CSSObject } from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export const Input: ForwardRefExoticComponent<
  InputProps & RefAttributes<InputRef>
> & {
  Search: typeof Search;
  TextArea: typeof TextArea;
} = styled(AntdInput).attrs((props: InputProps) => ({
  style: props.$wrapperStyle,
}))<InputProps>`
  /* The DOM structure changes when prefix/suffix/validation are used. */
  .mll-ant-input,
  &.mll-ant-input {
    font-size: ${fontSizeFromTheme};
    ${(props) => props.$inputStyle}
  }
`;
export type InputProps = Omit<AntdInputProps, 'style'> & {
  $inputStyle?: CSSObject | undefined;
  $wrapperStyle?: AntdInputProps['style'];
};
export type InputRef = AntdInputRef;

export const InputNumber = styled(AntdInputNumber).attrs(
  (props: InputNumberProps) => ({
    style: props.$wrapperStyle,
  }),
)<InputNumberProps>`
  /* The DOM structure changes when prefix/suffix/validation are used. */
  .mll-ant-input,
  &.mll-ant-input {
    font-size: ${fontSizeFromTheme};
    ${(props) => props.$inputStyle}
  }
`;
export type InputNumberProps = Omit<AntdInputNumberProps, 'style'> & {
  $inputStyle?: CSSObject | undefined;
  $wrapperStyle?: AntdInputProps['style'];
};

const AntdTextArea = AntdInput.TextArea;
export const TextArea: ForwardRefExoticComponent<TextAreaProps> &
  RefAttributes<TextAreaRef> = styled(AntdTextArea).attrs(
  (props: TextAreaProps) => ({
    style: props.$wrapperStyle,
  }),
)<TextAreaProps>`
  /* The DOM structure changes when prefix/suffix/validation are used. */
  .mll-ant-input,
  &.mll-ant-input {
    font-size: ${fontSizeFromTheme};
    ${(props) => props.$inputStyle}
  }
`;
Input.TextArea = TextArea;
export type TextAreaProps = Omit<AntdTextAreaProps, 'style'> & {
  $inputStyle?: CSSObject | undefined;
  $wrapperStyle?: AntdTextAreaProps['style'];
};
export type TextAreaRef = AntdTextAreaRef;

const AntdSearch = AntdInput.Search;
const Search: typeof AntdSearch = styled(AntdSearch)`
  /* Present in the original styles, see https://4x.ant.design/components/input/#components-input-demo-search-input */
  /* Probably gets lost due to wrong handling of the mll-ant prefix? */
  .mll-ant-input-group-addon:last-child {
    left: -1px;
    padding: 0;
    border: 0;
  }
`;
Input.Search = Search;
export type SearchProps = AntdSearchProps;
