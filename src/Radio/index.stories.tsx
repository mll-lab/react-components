import { Story } from '@storybook/react';
import React from 'react';

import { Radio, RadioProps } from './index';

export default {
  title: 'Radio',
  component: Radio,
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

export const Default: Story<RadioProps> = (args) => (
  <Radio.Group
    options={[
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ]}
    {...args}
  />
);
