import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import React, { ReactElement, useCallback } from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type SelectProps<T> = AntdSelectProps<T>;
export * from './formInput';

const StyledSelect = styled(AntdSelect)`
  &,
  .mll-ant-select-arrow {
    font-size: ${fontSizeFromTheme};
  }
  .mll-ant-select-selection-item-remove {
    font-size: 0.85em;
  }
` as typeof AntdSelect;

const StyledDropdown = styled.div`
  font-size: ${fontSizeFromTheme};
  .mll-ant-select-item {
    font-size: 1em;
  }
`;

export function Select<T>({
  children,
  dropdownRender,
  ...props
}: SelectProps<T>) {
  const styledDropdownRender = useCallback(
    (menu: ReactElement) => (
      <StyledDropdown>
        {dropdownRender ? dropdownRender(menu) : menu}
      </StyledDropdown>
    ),
    [dropdownRender],
  );

  return (
    <StyledSelect<T> {...props} dropdownRender={styledDropdownRender}>
      {children}
    </StyledSelect>
  );
}

Select.Option = StyledSelect.Option;
