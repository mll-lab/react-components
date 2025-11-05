import { StoryFn } from '@storybook/react';
import React, { useCallback, useRef } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Button } from '../Button';
import { Form, toFormInputOption } from '../Form';
import { TextAreaRef } from '../Input';
import { Space } from '../Space';

import { AutocompleteField } from './AutocompleteField';
import { CheckboxField } from './CheckboxField';
import { CheckboxGroupField } from './CheckboxGroupField';
import { DatePickerField } from './DatePickerField';
import { DateRangePickerField } from './DateRangePickerField';
import { FieldProvider, FieldProviderProps } from './FieldProvider';
import { InputField } from './InputField';
import { InputNumberField } from './InputNumberField';
import { RadioGroupField } from './RadioGroupField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';
import { TextAreaField } from './TextAreaField';
import { formItemFieldProps } from './formItemFieldProps';

export default {
  title: 'Fields',
  args: {
    disabled: false,
  },
};

type FormType = {
  autocomplete: string;
  checkbox: boolean;
  checkboxGroup: Array<string>;
  input: string;
  input_number: number;
  radio_group: 1 | 2;
  select: 'a' | 'b';
  switch: boolean;
  text_area: string;
  date_range: string;
  date_picker: string;
};

export const Default: StoryFn<{
  disabled: boolean;
}> = function Default(props) {
  const formMethods = useForm<FormType>({ mode: 'all' });

  return (
    <FieldProvider {...props}>
      <FormProvider {...formMethods}>
        <AllFields />
      </FormProvider>
    </FieldProvider>
  );
};

export const ControlledError: StoryFn<{
  hasError: boolean;
  disabled: boolean;
}> = function ControlledError(props) {
  const formMethods = useForm<FormType>({ mode: 'all' });

  const { hasError, ...propsRest } = props;

  const formItemProps = useCallback(
    () =>
      formItemFieldProps({
        invalid: hasError,
        error: hasError
          ? {
              type: 'validate',
              message: 'some error',
            }
          : undefined,

        isTouched: true,
        isDirty: true,
      }),
    [hasError],
  );

  return (
    <FieldProvider {...propsRest} formItemProps={formItemProps}>
      <FormProvider {...formMethods}>
        <AllFields />
      </FormProvider>
    </FieldProvider>
  );
};
ControlledError.argTypes = {
  hasError: {
    control: {
      type: 'boolean',
      checked: false,
    },
  },
};

export const NestedProviders: StoryFn<FieldProviderProps> =
  function NestedProviders(props) {
    const formMethods = useForm<FormType>({
      mode: 'all',
    });

    return (
      <FieldProvider disabled={!props.disabled}>
        {/* overwrite upper provider values */}
        <FieldProvider disabled={props.disabled}>
          <FormProvider {...formMethods}>
            <AllFields />
          </FormProvider>
        </FieldProvider>
      </FieldProvider>
    );
  };

function AllFields() {
  const formMethods = useFormContext<FormType>();
  return (
    <Form>
      <AutocompleteField
        name="autocomplete"
        control={formMethods.control}
        formItem={{ label: 'Autocomplete' }}
        component={{
          options: ['foo', 'bar'].map(toFormInputOption),
        }}
      />
      <CheckboxField
        name="checkbox"
        control={formMethods.control}
        formItem={{
          label: 'Checkbox',
        }}
      >
        Checkbox children
      </CheckboxField>
      <CheckboxGroupField
        name="checkboxGroup"
        control={formMethods.control}
        formItem={{ label: 'CheckboxGroup' }}
        component={{ options: ['a', 'b'].map(toFormInputOption) }}
      />
      <InputField
        name="input"
        rules={{ required: 'You really need this', maxLength: 3 }}
        control={formMethods.control}
        formItem={{
          label: 'Input required',
        }}
      />
      <InputField
        name="input"
        control={formMethods.control}
        formItem={{
          label: 'Input styled',
        }}
        component={{
          $inputStyle: { fontWeight: 'bold' },
          $wrapperStyle: { border: '5px red solid' },
        }}
        defaultValue="some bold text"
      />
      <InputNumberField
        name="input_number"
        rules={{ required: 'Absolutely necessary' }}
        control={formMethods.control}
        formItem={{
          label: 'InputNumber required',
        }}
      />
      <InputNumberField
        name="input_number"
        control={formMethods.control}
        formItem={{
          label: 'InputNumber styled',
        }}
        component={{
          $inputStyle: { fontWeight: 'bold' },
          $wrapperStyle: { border: '5px red solid' },
        }}
      />
      <RadioGroupField
        name="radio_group"
        control={formMethods.control}
        formItem={{
          label: 'RadioGroup',
        }}
        component={{
          options: [1, 2],
        }}
      />
      <SelectField
        name="select"
        control={formMethods.control}
        formItem={{
          label: 'Select',
        }}
        component={{
          options: ['a', 'b'].map(toFormInputOption),
        }}
      />
      <SwitchField
        name="switch"
        control={formMethods.control}
        formItem={{
          label: 'Switch',
        }}
      />
      <DatePickerField
        name="date_picker"
        control={formMethods.control}
        formItem={{ label: 'DatePicker' }}
        component={{ placeholder: 'Datum wählen' }}
      />
      <DateRangePickerField
        name="date_range"
        control={formMethods.control}
        formItem={{ label: 'DateRangePicker' }}
      />
      <TextAreaStory />
    </Form>
  );
}

function TextAreaStory() {
  const { control } = useFormContext<FormType>();
  const textAreaRequiredRef = useRef<TextAreaRef>(null);
  const textAreaStyledRef = useRef<TextAreaRef>(null);
  return (
    <Space>
      <TextAreaField
        name="text_area"
        control={control}
        formItem={{
          label: 'TextArea required',
        }}
        component={{
          ref: textAreaRequiredRef,
          minLength: 3,
        }}
        rules={{ required: 'Very necessary' }}
      />
      <TextAreaField
        name="text_area"
        control={control}
        formItem={{
          label: 'TextArea styled',
        }}
        component={{
          ref: textAreaStyledRef,
          minLength: 3,
          $inputStyle: {
            borderColor: 'red',
            backgroundColor: 'pink',
          },
        }}
      />
      <Button onClick={() => textAreaRequiredRef.current?.focus()}>
        Focus TextArea required
      </Button>
      <Button onClick={() => textAreaStyledRef.current?.focus()}>
        Focus TextArea styled
      </Button>
    </Space>
  );
}
