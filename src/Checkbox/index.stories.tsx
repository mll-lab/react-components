import { StoryFn } from '@storybook/react';
import React from 'react';

import { Form } from '../Form';

import { Checkbox, CheckboxProps } from './index';

export default {
  title: 'Checkbox',
};

export const Default: StoryFn<CheckboxProps> = function Default(args) {
  return (
    <Checkbox defaultChecked {...args}>
      Checkbox
    </Checkbox>
  );
};

export const DisabledCheckbox: StoryFn<CheckboxProps> = function DisabledCheckbox(
  args,
) {
  return (
    <Checkbox defaultChecked disabled {...args}>
      Checkbox
    </Checkbox>
  );
};

export const IndeterminateCheckbox: StoryFn<CheckboxProps> =
  function IndeterminateCheckbox(args) {
    return (
      <Checkbox indeterminate {...args}>
        Checkbox
      </Checkbox>
    );
  };

export const WithoutLabel: StoryFn<CheckboxProps> = function WithoutLabel(args) {
  return <Checkbox defaultChecked {...args} />;
};

export const WithFormLabel: StoryFn<CheckboxProps> = function WithFormLabel(
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
