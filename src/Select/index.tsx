import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
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

/** As described in https://4x.ant.design/components/select/#components-select-demo-optgroup. */
export type GroupedOptionType = {
  label: string;
  options: DefaultOptionType;
};

export type { DefaultOptionType } from 'antd/lib/select';

export type { FilterFunc as FilterOptionFunction } from 'rc-select/es/Select';

export type SelectProps<
  ValueType = unknown,
  OptionType extends DefaultOptionType | GroupedOptionType = DefaultOptionType,
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
  ValueType,
  OptionType extends DefaultOptionType | GroupedOptionType,
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

export const Select = forwardRef(SelectInner) as unknown as (<
  TValue = unknown,
  TOption extends DefaultOptionType | GroupedOptionType = DefaultOptionType,
>(
  props: SelectProps<TValue, TOption> & RefAttributes<BaseSelectRef>,
) => ReactElement) & {
  Option: typeof AntdSelect.Option;
  OptGroup: typeof AntdSelect.OptGroup;
};
Select.Option = AntdSelect.Option;
Select.OptGroup = AntdSelect.OptGroup;
