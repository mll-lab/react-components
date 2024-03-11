import { Story } from '@storybook/react';
import React, { useCallback, useRef } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Button } from '../Button';
import { Form } from '../Form';
import { TextAreaRef } from '../Input';
import { toFormInputOption } from '../Select';
import { Space } from '../Space';

import { AutocompleteField } from './AutocompleteField';
import { CheckboxField } from './CheckboxField';
import { CheckboxGroupField } from './CheckboxGroupField';
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
};

export const Default: Story<{
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

export const ControlledError: Story<{
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
  disabled: {
    control: {
      type: 'boolean',
      checked: false,
    },
  },
  hasError: {
    control: {
      type: 'boolean',
      checked: false,
    },
  },
};

export const NestedProviders: Story<FieldProviderProps> =
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
NestedProviders.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
      checked: false,
    },
  },
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
      <TextAreaStory />
    </Form>
  );
}

function TextAreaStory() {
  const { control } = useFormContext<FormType>();
  const textAreaRequiredRef = useRef<TextAreaRef>(null);
  const textAreaStyledRef = useRef<TextAreaRef>(null);
  return (
    <Space direction="horizontal">
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
