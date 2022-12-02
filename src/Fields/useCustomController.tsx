import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export function useCustomController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(controllerProp: UseControllerProps<TFieldValues, TName>) {
  const controller = useController<TFieldValues, TName>({
    ...controllerProp,
    shouldUnregister: true,
  });
  return controller;
}
