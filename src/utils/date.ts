import {
  differenceInCalendarDays,
  format as dateFnsFormat,
  isValid,
  parse,
} from 'date-fns';
import de from 'date-fns/locale/de';

export const GERMAN_DOTLESS_DATE_FORMAT: string = 'ddMMy';
export const GERMAN_DATE_FORMAT: string = 'dd.MM.y';
export const ISO_GERMAN_DATE_FORMAT: string = 'y.MM.dd';
export const GERMAN_DATE_TIME_FORMAT: string = 'dd.MM.y HH:mm';
export const ISO_DATE_FORMAT: string = 'y-MM-dd';
export const ISO_DATE_TIME_FORMAT: string = 'y-MM-dd HH:mm:ss';
export const SECONDLESS_DATE_TIME_FORMAT: string = 'y-MM-dd HH:mm';

export const MINIMAL_VALID_DATE = new Date(1900, 0, 1);

export function parseDate(value: string, formatString: string): Date | null {
  const parsedDate = parse(value, formatString, new Date());

  return isValid(parsedDate) ? parsedDate : null;
}

export function parseGermanDate(value: string): Date | null {
  return parseDate(value, GERMAN_DATE_FORMAT);
}

export function parseIsoDate(value: string): Date | null {
  return parseDate(value, ISO_DATE_FORMAT);
}

export function parseSecondlessDateTime(value: string): Date | null {
  return parseDate(value, SECONDLESS_DATE_TIME_FORMAT);
}

export function parseGermanDotlessDate(value: string): Date | null {
  return parseDate(value, GERMAN_DOTLESS_DATE_FORMAT);
}

export function parseGermanDateFlexible(value: string): Date | null {
  return parseGermanDotlessDate(value) || parseGermanDate(value);
}

// export function formatGerman(date: string | number | Date): string {
//   return dateFnsFormat(date, GERMAN_DATE_FORMAT, { locale: de });
// }
//
// // reverse order of standard german format,
// // so that the columns in the tables could be sorted correctly
// export function formatIsoGerman(date: string | number | Date): string {
//   return dateFnsFormat(date, ISO_GERMAN_DATE_FORMAT, { locale: de });
// }
//
// export function formatGermanDateTime(date: string | number | Date): string {
//   return dateFnsFormat(date, GERMAN_DATE_TIME_FORMAT, { locale: de });
// }

export function formatIsoDate(date: number | Date): string {
  return dateFnsFormat(date, ISO_DATE_FORMAT, { locale: de });
}

export function formatSecondlessDateTime(dateTime: number | Date): string {
  return dateFnsFormat(dateTime, SECONDLESS_DATE_TIME_FORMAT, { locale: de });
}

export function formatIsoDateTime(dateTime: number | Date): string {
  return dateFnsFormat(dateTime, ISO_DATE_TIME_FORMAT, { locale: de });
}

export function isToday(date: Date | number) {
  return differenceInCalendarDays(new Date(), date) === 0;
}
