import { ColumnFilterItem } from 'antd/es/table/interface';
import { ReactNode } from 'react';

export function objectToColumnFilterItem<
  TLabels extends Record<string, ReactNode>,
>(labels: TLabels): Array<ColumnFilterItem> {
  return Object.entries(labels).map(([key, value]) => ({
    text: value,
    value: key,
  }));
}

export function mapToColumnFilterItem<
  TLabels extends Map<string | number | boolean, ReactNode>,
>(labels: TLabels): Array<ColumnFilterItem> {
  return Array.from(labels).map(([key, value]) => ({
    value: key,
    text: value,
  }));
}
