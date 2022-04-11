import { ColumnFilterItem } from 'antd/es/table/interface';

type Enum<E> = Record<keyof E, string>;
export function labeledEnumToColumnFilterItem<E extends Enum<E>>(
  enumType: E,
): Array<ColumnFilterItem> {
  return Object.entries(enumType).map(([key, value]) => ({
    text: value as string,
    value: key,
  }));
}
