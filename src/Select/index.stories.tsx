import { Story } from '@storybook/react';
import React, { ReactElement } from 'react';

import { Select, SelectProps } from './index';

export default {
  title: 'Select',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
};

export const Default: Story<SelectProps> = function Default(args) {
  return (
    <Select defaultValue="lucy" style={{ width: 120 }} size="small" {...args}>
      <Select.Option value="jack">Jack</Select.Option>
      <Select.Option value="lucy">Lucy</Select.Option>
      <Select.Option value="henry" disabled>
        Henry
      </Select.Option>
    </Select>
  );
};

export const Multiple: Story<SelectProps> = function Multiple(args) {
  return <Default mode="multiple" {...args} />;
};

export const Group: Story<SelectProps> = function Group(args) {
  return (
    <Select defaultValue="lucy" style={{ width: 120 }} {...args}>
      <Select.OptGroup label="Guys">
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="henry" disabled>
          Henry
        </Select.Option>
      </Select.OptGroup>
      <Select.OptGroup label="Gals">
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select.OptGroup>
    </Select>
  );
};

export const CustomDropdown: Story<SelectProps> = function CustomDropdown(
  args,
) {
  return <Multiple dropdownRender={renderDropdown} {...args} />;
};

function renderDropdown(menu: ReactElement) {
  return (
    <>
      <span>Custom Dropdown</span>
      {menu}
    </>
  );
}
