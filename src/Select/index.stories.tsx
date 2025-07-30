import { Story } from '@storybook/react';
import React, { ReactElement } from 'react';

import { Select, SelectProps } from './index';

export default {
  title: 'Select',
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
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

export const OptGroup: Story<SelectProps> = function OptGroup(args) {
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
      <Select.OptGroup label="Other" disabled>
        <Select.Option value="juice">Juice</Select.Option>
      </Select.OptGroup>
    </Select>
  );
};

export const OptionsGroup: Story<SelectProps> = function OptionsGroups(args) {
  return (
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      options={[
        {
          label: 'Guys',
          options: [
            { label: 'Jack', value: 'jack' },
            { label: 'Henry', value: 'henry', disabled: true },
          ],
        },
        { label: 'Gals', options: [{ label: 'Lucy', value: 'lucy' }] },
        {
          label: 'Other',
          disabled: true,
          options: [{ label: 'Juice', value: 'juice' }],
        },
      ]}
      {...args}
    />
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
