/* eslint-disable import/order */
import { Story } from '@storybook/react';
import React, { useCallback, useRef } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Form } from '../Form';
import { TextAreaRef } from '../Input';
import { toFormInputOption } from '../Select';

import { CheckboxField } from './CheckboxField';
import { FieldProvider, FieldProviderProps } from './FieldProvider';
import { InputField } from './InputField';
import { InputNumberField } from './InputNumberField';
import { RadioGroupField } from './RadioGroupField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';
import { formItemFieldProps } from './formItemFieldProps';

import { Button } from '../Button';
import { Space } from '../Space';

export default {
  title: 'Fields',
  argTypes: {
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
  },
};

type FormType = {
  checkbox: boolean;
  input: string;
  input_number: number;
  radio_group: 1 | 2;
  select: 'a' | 'b';
  text_area: string;
};

export const Default: Story<{
  hasError: boolean;
  disabled: boolean;
}> = function Default(props) {
  const formMethods = useForm<FormType>();

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

export const NestedProviders: Story<
  FieldProviderProps & { hasError: boolean }
> = function NestedProviders(props) {
  const formMethods = useForm<FormType>();

  const { hasError } = props;

  const parentFormItemProps = () =>
    formItemFieldProps({
      invalid: false,
      error: undefined,
      isTouched: false,
      isDirty: false,
    });

  const childFormItemProps = useCallback(
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
    <FieldProvider
      disabled={!props.disabled}
      formItemProps={parentFormItemProps}
    >
      {/* overwrite upper provider values */}
      <FieldProvider
        disabled={props.disabled}
        formItemProps={childFormItemProps}
      >
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
      <CheckboxField
        name="checkbox"
        control={formMethods.control}
        formItem={{
          label: 'Checkbox Label',
        }}
      >
        Checkbox children
      </CheckboxField>
      <InputField
        name="input"
        control={formMethods.control}
        formItem={{
          label: 'Input Label',
        }}
      />
      <InputNumberField
        name="input_number"
        control={formMethods.control}
        formItem={{
          label: 'InputNumber Label',
        }}
      />
      <RadioGroupField
        name="radio_group"
        control={formMethods.control}
        formItem={{
          label: 'InputNumber Label',
        }}
        component={{
          options: [1, 2],
        }}
      />
      <SelectField
        name="select"
        control={formMethods.control}
        formItem={{
          label: 'Select Label',
        }}
        component={{
          options: ['a', 'b'].map(toFormInputOption),
        }}
      />
      <TextAreaStory />
    </Form>
  );
}

function TextAreaStory() {
  const { control } = useFormContext<FormType>();
  const textArea1Ref = useRef<TextAreaRef>(null);
  const textArea2Ref = useRef<TextAreaRef>(null);
  return (
    <Space direction="horizontal">
      <TextAreaField
        name="text_area"
        control={control}
        formItem={{
          label: 'TextArea 1',
        }}
        component={{
          ref: textArea1Ref,
          minLength: 3,
        }}
      />
      <TextAreaField
        name="text_area"
        control={control}
        formItem={{
          label: 'TextArea 2',
        }}
        component={{
          ref: textArea2Ref,
          minLength: 3,
        }}
      />
      <Button onClick={() => textArea1Ref.current?.focus()}>
        Focus TextArea 1
      </Button>
      <Button onClick={() => textArea2Ref.current?.focus()}>
        Focus TextArea 2
      </Button>
    </Space>
  );
}
