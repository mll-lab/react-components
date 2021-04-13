import { ColumnFilterItem } from 'antd/es/table/interface';

type Enum<E> = Record<keyof E, string>;
export function labeledEnumToColumnFilterItem<E extends Enum<E>>(
  enumType: E,
): Array<ColumnFilterItem> {
  return Object.entries(enumType).map(([originalValue, label]) => ({
    text: label as string,
    value: originalValue,
  }));
}
