import { Story } from '@storybook/react';
import React, { useCallback, useRef } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Button } from '../Button';
import { Form } from '../Form';
import { TextAreaRef } from '../Input';
import { toFormInputOption } from '../Select';
import { Space } from '../Space';

import { CheckboxField } from './CheckboxField';
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
  checkbox: boolean;
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
        rules={{ required: 'You really need this', maxLength: 3 }}
        control={formMethods.control}
        formItem={{
          label: 'Input Label',
        }}
      />
      <InputNumberField
        name="input_number"
        rules={{ required: 'Absolutely necessary' }}
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
      <SwitchField
        name="switch"
        control={formMethods.control}
        formItem={{
          label: 'Switch Label',
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
        rules={{ required: 'Very necessary' }}
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
