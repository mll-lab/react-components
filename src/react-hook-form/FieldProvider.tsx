import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

export type FieldContextValues = {
  disabled: boolean;
};

export const FieldContext = createContext<FieldContextValues>({
  disabled: false,
});

export const useFieldContext = () => useContext(FieldContext);

export type FieldProviderProps = PropsWithChildren<{
  disabled: boolean;
}>;

export function FieldProvider({ disabled, children }: FieldProviderProps) {
  const value = useMemo(
    () => ({
      disabled,
    }),
    [disabled],
  );

  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
}
