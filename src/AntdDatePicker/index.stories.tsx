import { Story } from '@storybook/react';
import React from 'react';

import { AntdDatePicker, AntdDatePickerProps } from './index';

export default {
  title: 'AntdDatePicker',
  component: AntdDatePicker,
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Default: Story<AntdDatePickerProps> = (args) => (
  <AntdDatePicker {...args} />
);

export const WithTime: Story<AntdDatePickerProps> = (args) => (
  <AntdDatePicker
    showTime={{ showHour: true, showMinute: true, showSecond: true }}
    {...args}
  />
);
