import { Modify } from '@mll-lab/js-utils';
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import { BaseSelectRef } from 'rc-select';
import type { FilterFunc as AntdFilterFunc } from 'rc-select/es/Select';
import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  RefAttributes,
  useCallback,
} from 'react';
import styled from 'styled-components';

import { FormInputOption } from '../Form';
import { fontSizeFromTheme } from '../styled-utils';

export type MaybeGroupedInputOption<
  TValue = unknown,
  TLabel extends ReactNode = ReactNode,
> = FormInputOption<TValue, TLabel> | GroupedInputOption<TValue, TLabel>;

/** As described in https://4x.ant.design/components/select/#components-select-demo-optgroup. */
export type GroupedInputOption<
  TValue = unknown,
  TLabel extends ReactNode = ReactNode,
> = {
  label: TLabel;
  options: Array<FormInputOption<TValue, TLabel>>;
  disabled?: boolean;
};

export type FilterOptionFunction<
  TValue = unknown,
  TOption extends
    MaybeGroupedInputOption<TValue> = MaybeGroupedInputOption<TValue>,
> = AntdFilterFunc<TOption>;

export type SelectProps<
  TValue = unknown,
  TOption extends
    MaybeGroupedInputOption<TValue> = MaybeGroupedInputOption<TValue>,
> = Modify<
  AntdSelectProps<TValue, TOption>,
  {
    filterOption?: boolean | FilterOptionFunction<TValue, TOption>;
  }
> &
  RefAttributes<BaseSelectRef>;

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
  TValue,
  TOptionType extends MaybeGroupedInputOption<TValue>,
>(
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
  TOptionType extends
    MaybeGroupedInputOption<TValue> = MaybeGroupedInputOption<TValue>,
>(
  props: SelectProps<TValue, TOptionType>,
) => ReactElement) & {
  Option: typeof AntdSelect.Option;
  OptGroup: typeof AntdSelect.OptGroup;
};
Select.Option = AntdSelect.Option;
Select.OptGroup = AntdSelect.OptGroup;
