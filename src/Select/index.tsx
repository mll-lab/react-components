import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import React, { ReactElement } from 'react';
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
  .mll-ant-select-item {
    font-size: ${fontSizeFromTheme};
  }
`;

export function Select<T>({
  children,
  dropdownRender,
  ...props
}: SelectProps<T>) {
  return (
    <StyledSelect<T>
      {...props}
      dropdownRender={(menu) => (
        <StyledSelectDropdown menu={menu} dropdownRender={dropdownRender} />
      )}
    >
      {children}
    </StyledSelect>
  );
}

type StyledDropdownRender = {
  menu: ReactElement;
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
};

function StyledSelectDropdown({ menu, dropdownRender }: StyledDropdownRender) {
  return (
    <StyledDropdown>
      {dropdownRender ? dropdownRender(menu) : menu}
    </StyledDropdown>
  );
}

Select.Option = StyledSelect.Option;
