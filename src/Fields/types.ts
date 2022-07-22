import { FormItemProps } from '../Form';

export type FieldLayout = Pick<
  FormItemProps<unknown>,
  'labelCol' | 'wrapperCol'
>;
