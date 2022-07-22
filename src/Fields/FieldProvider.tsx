import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import { ControllerFieldState } from 'react-hook-form';

import { FormItemProps } from '../Form';

import { formItemFieldProps } from './formItemFieldProps';

export type FieldContextValues = {
  disabled: boolean;
  formItemProps: (
    fieldState: ControllerFieldState,
  ) => Partial<FormItemProps<unknown>>;
};

export const FieldContext = createContext<FieldContextValues>({
  disabled: false,
  formItemProps: formItemFieldProps,
});

export const useFieldContext = () => useContext(FieldContext);

export type FieldProviderProps = PropsWithChildren<{
  disabled?: boolean;
  formItemProps?: (
    fieldState: ControllerFieldState,
  ) => Partial<FormItemProps<unknown>>;
}>;

export function FieldProvider({
  children,
  disabled,
  formItemProps,
}: FieldProviderProps) {
  // When current provider does not specify optional props, the parent field
  // provider's values will be used
  const parentFieldContext = useFieldContext();

  const value = useMemo(
    () => ({
      disabled: (disabled || parentFieldContext.disabled) ?? false,
      formItemProps:
        (formItemProps || parentFieldContext.formItemProps) ??
        formItemFieldProps,
    }),
    [disabled, formItemProps],
  );

  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
}
