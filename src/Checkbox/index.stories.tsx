import { Story } from '@storybook/react';
import React from 'react';

import { Form } from '../Form';

import { Checkbox, CheckboxProps } from './index';

export default {
  title: 'Checkbox',
};

export const Default: Story<CheckboxProps> = function Default(args) {
  return (
    <Checkbox defaultChecked {...args}>
      Checkbox
    </Checkbox>
  );
};

export const DisabledCheckbox: Story<CheckboxProps> = function DisabledCheckbox(
  args,
) {
  return (
    <Checkbox defaultChecked disabled {...args}>
      Checkbox
    </Checkbox>
  );
};

export const IndeterminateCheckbox: Story<CheckboxProps> =
  function IndeterminateCheckbox(args) {
    return (
      <Checkbox indeterminate {...args}>
        Checkbox
      </Checkbox>
    );
  };

export const WithoutLabel: Story<CheckboxProps> = function WithoutLabel(args) {
  return <Checkbox defaultChecked {...args} />;
};

export const WithFormLabel: Story<CheckboxProps> = function WithFormLabel(
  args,
) {
  return (
    <Form>
      <Form.Item label="Checkbox">
        <Checkbox defaultChecked {...args} />
      </Form.Item>
    </Form>
  );
};
