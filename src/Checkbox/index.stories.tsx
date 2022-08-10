import { Story } from '@storybook/react';
import React from 'react';

import { Form } from '../Form';

import { Checkbox, CheckboxProps } from './index';

export default {
  title: 'Checkbox',
};

export const Default: Story<CheckboxProps> = (args) => (
  <Checkbox defaultChecked {...args}>
    Checkbox
  </Checkbox>
);

export const DisabledCheckbox: Story<CheckboxProps> = (args) => (
  <Checkbox defaultChecked disabled {...args}>
    Checkbox
  </Checkbox>
);

export const WithoutLabel: Story<CheckboxProps> = (args) => (
  <Checkbox defaultChecked {...args} />
);

export const WithFormLabel: Story<CheckboxProps> = (args) => (
  <Form>
    <Form.Item label="Checkbox">
      <Checkbox defaultChecked {...args} />
    </Form.Item>
  </Form>
);
