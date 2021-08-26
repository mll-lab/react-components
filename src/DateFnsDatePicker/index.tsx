import generatePicker, {
  PickerDateProps,
  PickerProps,
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

export type DateFnsDatePickerProps = PickerProps<Date> &
  Omit<PickerDateProps<Date>, 'picker'>;

const localeParse = (format: string) =>
  format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo');

// TODO https://github.com/react-component/picker/issues/147
export const DateFnsDatePicker = generatePicker<Date>({
  ...dateFnsGenerateConfig,
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
