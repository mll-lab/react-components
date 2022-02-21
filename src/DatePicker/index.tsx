import { GERMAN_DATE_FORMAT } from '@mll-lab/js-utils';
import generatePicker, {
  PickerProps as AntdPickerProps,
  PickerDateProps as AntdPickerDateProps,
  PickerTimeProps as AntdPickerTimeProps,
  RangePickerProps as AntdRangePickerProps,
} from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import {
  format as formatDate,
  parse as parseDate,
  getWeek,
  isValid,
  startOfWeek,
} from 'date-fns';
import { de } from 'date-fns/locale';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import React, { ComponentClass } from 'react';

type PickerProps<T> = AntdPickerProps<T>;
type PickerDateProps<T> = AntdPickerDateProps<T>;
type PickerTimeProps<T> = AntdPickerTimeProps<T>;
type RangePickerProps<T> = AntdRangePickerProps<T>;

export type DatePickerProps = PickerProps<Date> &
  Omit<PickerDateProps<Date>, 'picker'>;

const localeParse = (format: string) =>
  format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo');

export const BaseDatePicker: ComponentClass<PickerProps<Date>, any> & {
  WeekPicker: ComponentClass<Omit<PickerDateProps<Date>, 'picker'>, any>;
  MonthPicker: ComponentClass<Omit<PickerDateProps<Date>, 'picker'>, any>;
  YearPicker: ComponentClass<Omit<PickerDateProps<Date>, 'picker'>, any>;
  RangePicker: ComponentClass<RangePickerProps<Date>, any>;
  TimePicker: ComponentClass<Omit<PickerTimeProps<Date>, 'picker'>, any>;
  QuarterPicker: ComponentClass<Omit<PickerTimeProps<Date>, 'picker'>, any>;
} = generatePicker<Date>({
  ...dateFnsGenerateConfig,
  // TODO remove when https://github.com/react-component/picker/pull/289 fixes https://github.com/react-component/picker/issues/147 bla
  locale: {
    getWeekFirstDay: () => de.options!.weekStartsOn!,
    getWeekFirstDate: (_, date) => startOfWeek(date, { locale: de }),
    getWeek: (_, date) => getWeek(date, { locale: de }),
    getShortWeekDays: () =>
      Array.from({ length: 7 }).map((_, i) =>
        de.localize!.day(i, { width: 'short' }),
      ),
    getShortMonths: () =>
      Array.from({ length: 12 }).map((_, i) =>
        de.localize!.month(i, { width: 'abbreviated' }),
      ),
    format: (_, date, format) => {
      if (!isValid(date)) {
        return '';
      }

      return formatDate(date, localeParse(format), {
        locale: de,
      });
    },
    parse: (_, text, formats) => {
      for (let i = 0; i < formats.length; i += 1) {
        const format = localeParse(formats[i]);
        const date = parseDate(text, format, new Date(), {
          locale: de,
        });

        if (isValid(date)) {
          return date;
        }
      }
      return null;
    },
  },
});

export function DatePicker(props: DatePickerProps) {
  let format = GERMAN_DATE_FORMAT;
  const { showTime } = props;
  if (typeof showTime === 'object') {
    if (showTime.showHour) {
      format += ' HH';
    }
    if (showTime.showMinute) {
      format += ':mm';
    }
    if (showTime.showSecond) {
      format += ':ss';
    }
  }
  const numbersOnlyFormat = format.replace(/[. :]/g, '');

  return (
    <BaseDatePicker
      format={[format, numbersOnlyFormat]}
      size="small"
      {...props}
    />
  );
}
