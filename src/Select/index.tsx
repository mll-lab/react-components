import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import React, { ReactElement, useCallback } from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export * from './formInput';

export type SelectProps<
  ValueType = unknown,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> = AntdSelectProps<ValueType, OptionType>;

const StyledSelect = styled(AntdSelect)`
  &,
  .mll-ant-select-arrow {
    font-size: ${fontSizeFromTheme};
  }
  .mll-ant-select-selection-item-remove {
    font-size: 0.85em;
  }
  &.mll-ant-select-sm.mll-ant-select-multiple .mll-ant-select-selection-item {
    height: 16px;
    line-height: 12px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
` as typeof AntdSelect;

const StyledDropdown = styled.div`
  font-size: ${fontSizeFromTheme};
  .mll-ant-select-item {
    font-size: 1em;
  }
`;

export function Select<
  ValueType = unknown,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>({ children, dropdownRender, ...props }: SelectProps<ValueType, OptionType>) {
  const styledDropdownRender = useCallback(
    (menu: ReactElement) => (
      <StyledDropdown>
        {dropdownRender ? dropdownRender(menu) : menu}
      </StyledDropdown>
    ),
    [dropdownRender],
  );

  return (
    <StyledSelect<ValueType, OptionType>
      {...props}
      dropdownRender={styledDropdownRender}
    >
      {children}
    </StyledSelect>
  );
}
Select.Option = AntdSelect.Option;
Select.OptGroup = AntdSelect.OptGroup;
