import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
  RadioProps as AntdRadioProps,
} from 'antd';
import { RadioButtonProps as AntdRadioButtonProps } from 'antd/es/radio/radioButton';
import React from 'react';
import styled from 'styled-components';

export type RadioProps = AntdRadioProps;
export type RadioGroupProps = AntdRadioGroupProps;
export type RadioButtonProps = AntdRadioButtonProps;

export const StyledRadio: typeof AntdRadio = styled(AntdRadio)<RadioProps>`
  & {
    font-size: ${(props) => props.theme.fontSize};
  }
`;

export const StyledRadioGroup: React.ForwardRefExoticComponent<
  RadioGroupProps & React.RefAttributes<HTMLElement>
> = styled(StyledRadio.Group)<RadioGroupProps>`
  .mll-ant-radio-wrapper,
  .mll-ant-radio-button-wrapper {
    font-size: ${(props) => props.theme.fontSize};
  }
`;

export const StyledRadioButton = styled(StyledRadio.Button)<RadioButtonProps>`
  &.mll-ant-radio-button-wrapper {
    font-size: ${(props) => props.theme.fontSize};
  }
`;

export const Radio: typeof AntdRadio = StyledRadio as typeof AntdRadio;
Radio.Group = StyledRadioGroup as typeof Radio.Group;
Radio.Button = StyledRadioButton;
