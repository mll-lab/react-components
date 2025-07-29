import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import { BaseSelectRef } from 'rc-select';
import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  RefAttributes,
  useCallback,
} from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type GroupedOptionType = {
  label: string;
  options: BaseOptionType;
};

export type SelectProps<
  ValueType = unknown,
  OptionType extends
    | BaseOptionType
    | DefaultOptionType
    | GroupedOptionType = DefaultOptionType,
> = AntdSelectProps<ValueType, OptionType> & RefAttributes<BaseSelectRef>;

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
    margin-top: 0;
    margin-bottom: 0;
  }
` as typeof AntdSelect;

const StyledDropdown = styled.div`
  font-size: ${fontSizeFromTheme};

  .mll-ant-select-item {
    font-size: 1em;
  }
`;

function SelectInner<
  ValueType = unknown,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  { children, dropdownRender, ...props }: SelectProps<ValueType, OptionType>,
  ref: ForwardedRef<BaseSelectRef>,
) {
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
      ref={ref}
      dropdownRender={styledDropdownRender}
      {...props}
    >
      {children}
    </StyledSelect>
  );
}

export const Select = forwardRef<
  BaseSelectRef,
  SelectProps<unknown, BaseOptionType | DefaultOptionType | GroupedOptionType>
>(SelectInner) as unknown as (<
  TValue = unknown,
  TOption extends
    | BaseOptionType
    | DefaultOptionType
    | GroupedOptionType = DefaultOptionType,
>(
  props: SelectProps<TValue, TOption> & RefAttributes<BaseSelectRef>,
) => ReactElement) & {
  Option: typeof AntdSelect.Option;
  OptGroup: typeof AntdSelect.OptGroup;
};
Select.Option = AntdSelect.Option;
Select.OptGroup = AntdSelect.OptGroup;
