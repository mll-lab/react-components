import { Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Form } from '../Form';
import { toFormInputOption } from '../Select';

import { CheckboxField } from './CheckboxField';
import { FieldProvider, FieldProviderProps } from './FieldProvider';
import { InputField } from './InputField';
import { InputNumberField } from './InputNumberField';
import { RadioGroupField } from './RadioGroupField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';

export default {
  title: 'Fields',
  argTypes: {
    disabled: {
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

export const Default: Story<FieldProviderProps> = (props) => {
  const formMethods = useForm<FormType>();

  return (
    <FieldProvider {...props}>
      <FormProvider {...formMethods}>
        <Form>
          <CheckboxField
            name="checkbox"
            control={formMethods.control}
            formItem={{
              label: 'Checkbox Label',
              labelCol: { span: 10 },
              wrapperCol: { span: 14 },
            }}
          />
          <InputField
            name="input"
            control={formMethods.control}
            formItem={{
              label: 'Input Label',
              labelCol: { span: 10 },
              wrapperCol: { span: 14 },
            }}
          />
          <InputNumberField
            name="input_number"
            control={formMethods.control}
            formItem={{
              label: 'InputNumber Label',
              labelCol: { span: 10 },
              wrapperCol: { span: 14 },
            }}
          />
          <RadioGroupField
            name="radio_group"
            control={formMethods.control}
            formItem={{
              label: 'InputNumber Label',
              labelCol: { span: 10 },
              wrapperCol: { span: 14 },
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
              labelCol: { span: 10 },
              wrapperCol: { span: 14 },
            }}
            component={{
              options: ['a', 'b'].map(toFormInputOption),
            }}
          />
          <TextAreaField
            name="text_area"
            control={formMethods.control}
            formItem={{
              label: 'TextArea Label',
              labelCol: { span: 10 },
              wrapperCol: { span: 14 },
            }}
          />
        </Form>
      </FormProvider>
    </FieldProvider>
  );
};
