import { Story } from '@storybook/react';
import React, { ReactElement, useCallback } from 'react';

import { Select, SelectProps } from './index';

export default {
  title: 'Select',
};

export const Default: Story<SelectProps<string>> = (args) => (
  <Select<string> defaultValue="lucy" style={{ width: 120 }} {...args}>
    <Select.Option value="jack">Jack</Select.Option>
    <Select.Option value="lucy">Lucy</Select.Option>
    <Select.Option value="henry" disabled>
      Henry
    </Select.Option>
  </Select>
);

export const Multiple: Story<SelectProps<string>> = (args) => (
  <Default mode="multiple" {...args} />
);

export const CustomDropdown: Story<SelectProps<string>> = (args) => {
  const Dropdown = useCallback(
    (menu: ReactElement) => (
      <>
        <span>Custom Dropdown</span>
        {menu}
      </>
    ),
    [],
  );

  return <Multiple dropdownRender={Dropdown} {...args} />;
};
