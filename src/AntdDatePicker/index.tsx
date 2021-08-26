import { DatePicker as BaseDatePicker } from 'antd';
import {
  PickerDateProps,
  PickerProps,
} from 'antd/es/date-picker/generatePicker';
import { Moment } from 'moment';
import React from 'react';

export type AntdDatePickerProps = PickerProps<Moment> &
  Omit<PickerDateProps<Moment>, 'picker'>;

export function AntdDatePicker(props: AntdDatePickerProps) {
  return <BaseDatePicker format="DD.MM.YYYY" {...props} />;
}
