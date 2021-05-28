import { Story } from '@storybook/react';
import React from 'react';

import DatePicker, { DatePickerProps } from './index';

export default {
  title: 'DatePicker',
};

export const Default: Story<DatePickerProps> = (args) => (
  <DatePicker {...args} />
);
