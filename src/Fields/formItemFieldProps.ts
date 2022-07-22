import { ControllerFieldState } from "react-hook-form";
import { FormItemProps } from "../Form";

export function formItemFieldProps(fieldState: ControllerFieldState): Partial<FormItemProps<unknown>> {
  return {
    hasFeedback: fieldState.invalid,
    help: fieldState.error?.message,
    validateStatus: fieldState.invalid ? 'error' : undefined
  };
}