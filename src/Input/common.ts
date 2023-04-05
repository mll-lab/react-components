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

const AntdTextArea = Input.TextArea;
export const TextArea: typeof AntdTextArea = styled(AntdTextArea)`
  font-size: ${fontSizeFromTheme};
`;
Input.TextArea = TextArea;
export type TextAreaProps = AntdTextAreaProps;
export type TextAreaRef = AntdTextAreaRef;

const AntdSearch = Input.Search;
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
