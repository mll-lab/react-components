import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
  RadioProps as AntdRadioProps,
} from 'antd';
import { RadioButtonProps as AntdRadioButtonProps } from 'antd/es/radio/radioButton';
import React from 'react';
import styled from 'styled-components';
import { fontSizeFromTheme } from '../styled-utils';

export type RadioProps = AntdRadioProps;
export type RadioGroupProps = AntdRadioGroupProps;
export type RadioButtonProps = AntdRadioButtonProps;

const StyledRadio: typeof AntdRadio = styled(AntdRadio)<RadioProps>`
  font-size: ${fontSizeFromTheme};
`;

const StyledRadioGroup: React.ForwardRefExoticComponent<
  RadioGroupProps & React.RefAttributes<HTMLElement>
> = styled(StyledRadio.Group)<RadioGroupProps>`
  .mll-ant-radio-wrapper,
  .mll-ant-radio-button-wrapper {
    font-size: ${fontSizeFromTheme};
  }
`;

const StyledRadioButton = styled(StyledRadio.Button)<RadioButtonProps>`
  font-size: ${fontSizeFromTheme};
`;

export const Radio: typeof AntdRadio = StyledRadio as typeof AntdRadio;
Radio.Group = StyledRadioGroup as typeof Radio.Group;
Radio.Button = StyledRadioButton;
