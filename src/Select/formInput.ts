import { ReactNode } from 'react';

export type FormInputOption<TValue, TLabel extends ReactNode> = {
  value: TValue;
  label: TLabel;
  disabled?: boolean;
};

export function objectToFormInputOptions<
  TLabels extends Record<string, TLabel>,
  TLabel extends ReactNode,
>(labels: TLabels): Array<FormInputOption<keyof TLabels, TLabel>> {
  return objectEntriesToFormInputOptions(Object.entries(labels));
}

export function objectEntriesToFormInputOptions<
  TLabelEntries extends Array<[string, TLabel]>,
  TLabel extends ReactNode,
>(
  labelEntries: TLabelEntries,
): Array<FormInputOption<TLabelEntries[number][0], TLabel>> {
  return labelEntries.map(([key, value]) => ({
    value: key as TLabelEntries[number][0],
    label: value,
  }));
}

export function mapToFormInputOptions<
  TLabels extends Map<TValue, TLabel>,
  TValue,
  TLabel extends ReactNode,
>(labels: TLabels): Array<FormInputOption<TValue, TLabel>> {
  return Array.from(labels).map(([key, value]) => ({
    value: key,
    label: value,
  }));
}

export function toFormInputOption<T extends ReactNode>(
  value: T,
): FormInputOption<T, T> {
  return { label: value, value };
}
