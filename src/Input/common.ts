import {
  Input as AntdInput,
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
  InputProps as AntdInputProps,
  InputRef as AntdInputRef,
} from 'antd';
import { TextAreaProps as AntdTextAreaProps } from 'antd/es/input';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type InputProps = AntdInputProps;
export type TextAreaProps = AntdTextAreaProps;
export type InputRef = AntdInputRef;
export type InputNumberProps = AntdInputNumberProps;

export const Input: typeof AntdInput = styled(AntdInput)`
  font-size: ${fontSizeFromTheme};

  .mll-ant-input-affix-wrapper,
  &.mll-ant-input-affix-wrapper {
    position: relative;
    width: 100%;
    min-width: 0;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all 0.3s;
    display: inline-flex;
    
    &> input.mll-ant-input {
      padding: 0;
      border: none;
      outline: none;
    }
    
    &::before {
      width: 0;
      visibility: hidden;
      content: '\\a0';
    }
  }

  .mll-ant-input-suffix {
    margin-left: 4px;
  }

  .mll-ant-input-prefix, mll-.ant-input-suffix {
    display: flex;
    flex: none;
    align-items: center;
  }
  
  .mll-anticon.ant-input-clear-icon, .mll-ant-input-clear-icon {
    margin: 0;
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
    vertical-align: -1px;
    cursor: pointer;
    transition: color 0.3s;
  }
`;

export const InputNumber: typeof AntdInputNumber = styled(AntdInputNumber)`
  font-size: ${fontSizeFromTheme};
`;

export const TextArea: typeof Input.TextArea = styled(Input.TextArea)`
  font-size: ${fontSizeFromTheme};
`;

Input.TextArea = TextArea;
