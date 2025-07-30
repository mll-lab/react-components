import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import { BaseSelectRef } from 'rc-select';
import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  RefAttributes,
  useCallback,
} from 'react';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type OptionType<TValue = unknown> =
  | ValueOptionType<TValue>
  | GroupedOptionType<TValue>;

export type ValueOptionType<TValue = unknown> = {
  label: ReactNode;
  value: TValue;
  disabled?: boolean;
};

/** As described in https://4x.ant.design/components/select/#components-select-demo-optgroup. */
export type GroupedOptionType<TValue = unknown> = {
  label: ReactNode;
  options: Array<ValueOptionType<TValue>>;
  disabled?: boolean;
};

export type { FilterFunc as FilterOptionFunction } from 'rc-select/es/Select';

export type SelectProps<
  TValue = unknown,
  TOption extends OptionType<TValue> = OptionType<TValue>,
> = AntdSelectProps<TValue, TOption> & RefAttributes<BaseSelectRef>;

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

function SelectInner<TValue, TOptionType extends OptionType<TValue>>(
  { children, dropdownRender, ...props }: SelectProps<TValue, TOptionType>,
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
    <StyledSelect<TValue, TOptionType>
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
  TOptionType extends OptionType<TValue> = OptionType<TValue>,
>(
  props: SelectProps<TValue, TOptionType> & RefAttributes<BaseSelectRef>,
) => ReactElement) & {
  Option: typeof AntdSelect.Option;
  OptGroup: typeof AntdSelect.OptGroup;
};
Select.Option = AntdSelect.Option;
Select.OptGroup = AntdSelect.OptGroup;
