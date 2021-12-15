import { Story } from '@storybook/react';
import React from 'react';

import { DatePicker, DatePickerProps } from './index';

export default {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Default: Story<DatePickerProps> = (args) => (
  <DatePicker {...args} />
);

export const WithTime: Story<DatePickerProps> = (args) => (
  <DatePicker
    showTime={{ showHour: true, showMinute: true, showSecond: true }}
    {...args}
  />
);
