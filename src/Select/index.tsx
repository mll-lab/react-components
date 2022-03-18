import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type SelectProps<T> = AntdSelectProps<T>;
export * from './formInput';

const StyledSelect = styled(AntdSelect)`
  &,
  .mll-ant-select-arrow,
  .mll-ant-select-item {
    font-size: ${fontSizeFromTheme};
  }
  .mll-ant-select-selection-item-remove {
    font-size: 0.85em;
  }
` as typeof AntdSelect;

const StyledOption = styled(StyledSelect.Option)`
  .mll-ant-select-item {
    font-size: ${fontSizeFromTheme};
  }
` as typeof StyledSelect.Option;

const StyledDropdown = styled.div`
  .mll-ant-select-item {
    font-size: ${fontSizeFromTheme};
  }
`;

export function Select<T>({ children, ...props }: SelectProps<T>) {
  return (
    <StyledSelect<T>
      {...props}
      dropdownRender={(menu) => (
        <StyledDropdown>
          {props.dropdownRender ? props.dropdownRender(menu) : menu}
        </StyledDropdown>
      )}
    >
      {children}
    </StyledSelect>
  );
}

Select.Option = StyledOption;
