import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import { BaseSelectRef } from 'rc-select';
import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  useCallback,
} from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export * from './formInput';

export type SelectProps<
  ValueType = unknown,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
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

type SelectType = ForwardRefExoticComponent<
  SelectProps<unknown, BaseOptionType | DefaultOptionType> &
    RefAttributes<BaseSelectRef>
> & { Option: typeof AntdSelect.Option; OptGroup: typeof AntdSelect.OptGroup };

export const InternalSelect = forwardRef<
  BaseSelectRef,
  SelectProps<unknown, BaseOptionType | DefaultOptionType>
>(
  <
    ValueType = unknown,
    OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
  >(
    {
      children,
      dropdownRender,
      onChange,
      ...props
    }: SelectProps<ValueType, OptionType>,
    ref: ForwardedRef<BaseSelectRef>,
  ) => {
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
        {...props}
        dropdownRender={styledDropdownRender}
      >
        {children}
      </StyledSelect>
    );
  },
);

InternalSelect.displayName = 'Select';

const Select = InternalSelect as SelectType;

Select.Option = AntdSelect.Option;
Select.OptGroup = AntdSelect.OptGroup;

export { Select };
