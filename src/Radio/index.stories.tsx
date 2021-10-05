import { Story } from '@storybook/react';
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
        options: ['default', 'button'],
        default: 'button',
      },
    },
  },
};

export const Default: Story<RadioGroupProps> = (args) => (
  <Radio.Group
    options={[
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ]}
    {...args}
  />
);
