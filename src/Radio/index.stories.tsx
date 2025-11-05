import { StoryFn } from '@storybook/react';
import React from 'react';

import { Radio, RadioGroupProps } from './index';

export default {
  title: 'Radio',
  component: Radio.Group,
  argTypes: {
    onChange: { action: 'onChange' },
    optionType: {
      control: {
        type: 'inline-radio',
      },
      options: ['default', 'button'],
    },
    buttonStyle: {
      control: {
        type: 'inline-radio',
      },
      options: ['solid', 'outline'],
    },
  },
};

export const Default: StoryFn<RadioGroupProps> = function Default(args) {
  return (
    <Radio.Group
      options={[
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ]}
      {...args}
    />
  );
};
