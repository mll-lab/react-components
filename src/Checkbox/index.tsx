import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxProps } from 'antd/es/checkbox/Checkbox';
import { CheckboxGroupProps } from 'antd/es/checkbox/Group';
import * as React from 'react';

interface CheckboxComponentType
  extends React.ForwardRefExoticComponent<
    CheckboxProps & React.RefAttributes<HTMLInputElement>
  > {
  Group: React.NamedExoticComponent<CheckboxGroupProps>;
  __ANT_CHECKBOX: boolean;
}

export const Checkbox: CheckboxComponentType = AntdCheckbox;
