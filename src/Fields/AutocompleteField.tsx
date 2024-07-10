import type { BaseSelectRef } from 'rc-select';
import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';

import { Autocomplete, AutocompleteProps } from '../Autocomplete';

import { useFieldContext } from './FieldProvider';
import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';

type AutocompleteFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Pick<FieldWrapperProps<TFieldValues, TName>, 'formItem'> & {
    component?: AutocompleteProps & {
      ref?: React.Ref<BaseSelectRef>;
    };
  };

/**
 * This component appears unstyled in Storybook because it is not properly prefixing its class names.
 * However, if this library is used alongside globally included antd styles, it works somewhat fine.
 * When we rip out antd 3 from our projects, we may want to remove the class prefix in this library to fix this.
 */
export function AutocompleteField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItem,
  component,
  ...controller
}: AutocompleteFieldProps<TFieldValues, TName>) {
  const { field } = useController<TFieldValues, TName>(controller);

  const { disabled } = useFieldContext();

  return (
    <FieldWrapper controller={controller} formItem={formItem}>
      <Autocomplete
        {...field}
        value={field.value ?? undefined}
        disabled={disabled}
        {...component}
      />
    </FieldWrapper>
  );
}
