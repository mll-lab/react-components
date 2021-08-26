import generatePicker, {
  PickerDateProps,
  PickerProps,
} from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import localeDe from 'date-fns/locale/de';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

registerLocale('de', localeDe);
setDefaultLocale('de');

export type DateFnsDatePickerProps = PickerProps<Date> &
  Omit<PickerDateProps<Date>, 'picker'>;

export const DateFnsDatePicker = generatePicker<Date>(dateFnsGenerateConfig);
