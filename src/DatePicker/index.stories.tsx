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

export const Default: Story<DatePickerProps> = function Default(
  args: DatePickerProps,
) {
  return <DatePicker {...args} />;
};

export const WithTime: Story<DatePickerProps> = function WithTime(
  args: DatePickerProps,
) {
  return (
    <DatePicker
      showTime={{ showHour: true, showMinute: true, showSecond: true }}
      {...args}
    />
  );
};
