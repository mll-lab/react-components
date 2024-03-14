import { PickerLocale } from 'antd/lib/date-picker/generatePicker';
import CalendarLocale from 'rc-picker/lib/locale/de_DE';

export const PICKER_LOCALE: PickerLocale = {
  lang: {
    placeholder: 'Datum auswählen',
    rangePlaceholder: ['Von', 'Bis'],
    ...CalendarLocale,
    shortWeekDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    shortMonths: [
      'Jan',
      'Feb',
      'Mär',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez',
    ],
  },
  timePickerLocale: {},
};
