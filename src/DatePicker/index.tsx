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

// TODO remove when https://github.com/react-component/picker/pull/289 fixes https://github.com/react-component/picker/issues/147
// eslint-disable-next-line @getify/proper-arrows/where
const localeParse = (format: string) =>
  format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo');

export const BaseDatePicker: ComponentClass<PickerProps<Date>, unknown> & {
  WeekPicker: ComponentClass<Omit<PickerDateProps<Date>, 'picker'>, unknown>;
  MonthPicker: ComponentClass<Omit<PickerDateProps<Date>, 'picker'>, unknown>;
  YearPicker: ComponentClass<Omit<PickerDateProps<Date>, 'picker'>, unknown>;
  RangePicker: ComponentClass<RangePickerProps<Date>, unknown>;
  TimePicker: ComponentClass<Omit<PickerTimeProps<Date>, 'picker'>, unknown>;
  QuarterPicker: ComponentClass<Omit<PickerTimeProps<Date>, 'picker'>, unknown>;
} = generatePicker<Date>({
  ...dateFnsGenerateConfig,
  // TODO remove when https://github.com/react-component/picker/pull/289 fixes https://github.com/react-component/picker/issues/147
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
    format: (_, date, formatOrFormats) => {
      if (!isValid(date)) {
        return '';
      }

      return formatDate(
        date,
        localeParse(
          // When showTime is used, this function is unexpectedly called with an array of formats.
          // Multiple formats are only useful for flexible parsing, so we just use the first given format.
          // @ts-expect-error formatOrFormats is not necessarily a string
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          formatOrFormats instanceof Array
            ? formatOrFormats[0]
            : formatOrFormats,
        ),
        {
          locale: de,
        },
      );
    },
    parse: (_, text, formats) => {
      for (let i = 0; i < formats.length; i += 1) {
        const format = localeParse(formats[i]!);
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

  // Allows faster data entry, omitting special characters
  const numbersOnlyFormat = format.replace(/[. :]/g, '');

  return (
    <BaseDatePicker
      format={[format, numbersOnlyFormat]}
      size="small"
      {...props}
    />
  );
}
