import { StoryFn } from '@storybook/react';
import React from 'react';

import { toFormInputOption } from '../Form';

import { AutocompleteProps, Autocomplete } from './index';

export default {
  title: 'Autocomplete',
};

export const WithOptions: StoryFn<AutocompleteProps> = function WithOptions(
  args,
) {
  return (
    <Autocomplete
      options={['food', 'foo', 'foobar', 'bar'].map(toFormInputOption)}
      {...args}
    />
  );
};
