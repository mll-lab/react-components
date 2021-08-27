import { Story } from '@storybook/react';
import React from 'react';

import { DateFnsDatePicker, DateFnsDatePickerProps } from './index';

export default {
  title: 'DateFnsDatePicker',
  component: DateFnsDatePicker,
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Default: Story<DateFnsDatePickerProps> = (args) => (
  <DateFnsDatePicker {...args} />
);

export const WithTime: Story<DateFnsDatePickerProps> = (args) => (
  <DateFnsDatePicker
    showTime={{ showHour: true, showMinute: true, showSecond: true }}
    {...args}
  />
);
