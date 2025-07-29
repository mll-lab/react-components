import { Story } from '@storybook/react';
import React from 'react';

import { toFormInputOption } from '../Form';

import { AutocompleteProps, Autocomplete } from './index';

export default {
  title: 'Autocomplete',
};

export const WithOptions: Story<AutocompleteProps> = function WithOptions(
  args,
) {
  return (
    <Autocomplete
      options={['food', 'foo', 'foobar', 'bar'].map((value: string) =>
        toFormInputOption(value),
      )}
      {...args}
    />
  );
};
