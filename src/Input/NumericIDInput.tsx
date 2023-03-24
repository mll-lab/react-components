import { isOnlyDigits } from '@mll-lab/js-utils';
import React, { useState } from 'react';

import { Input, InputProps } from './common';

export type NumericIDInputProps = InputProps;

export function NumericIDInput(props: InputProps) {
  const isControlled = 'value' in props;
  const [valueState, setValueState] = useState('');

  return (
    <Input
      onChange={(e) => {
        const newValue = e.target.value;
        if (isOnlyDigits(newValue)) {
          props.onChange?.(e);
          if (!isControlled) {
            setValueState(newValue);
          }
        }
      }}
      value={isControlled ? props.value : valueState}
    />
  );
}
