import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";

import { formItemFieldProps } from './formItemFieldProps'
import { FormItemProps } from "../Form";
import { ControllerFieldState } from "react-hook-form";

export type FieldContextValues = {
  disabled: boolean;
  formItemProps: (fieldState: ControllerFieldState) => Partial<FormItemProps<unknown>>,
};

export const FieldContext = createContext<FieldContextValues>({
  disabled: false,
  formItemProps: formItemFieldProps,
});

export const useFieldContext = () => useContext(FieldContext);

export type FieldProviderProps = PropsWithChildren<{
  disabled: boolean;
  formItemProps?: (fieldState: ControllerFieldState) => Partial<FormItemProps<unknown>>,
}>;

export function FieldProvider({ children, disabled, formItemProps }: FieldProviderProps) {
  const value = useMemo(
    () => ({
      disabled,
      formItemProps: formItemProps ?? formItemFieldProps,
    }),
    [disabled, formItemProps],
  );

  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
}
