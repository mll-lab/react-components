import { ReactNode } from 'react';

export type FormInputOption<TValue, TLabel extends ReactNode> = {
  value: TValue;
  label: TLabel;
  disabled?: boolean;
};

export function objectToFormInputOptions<
  TEnum extends Record<string, TLabel>,
  TLabel extends ReactNode
>(labeledEnum: TEnum): Array<FormInputOption<keyof TEnum, TLabel>> {
  return Object.entries(labeledEnum).map(([key, value]) => ({
    value: key as keyof TEnum,
    label: value,
  }));
}

export function toFormInputOption<T>(value: T): FormInputOption<T, T> {
  return { label: value, value };
}

