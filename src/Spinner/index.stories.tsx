import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Spinner, SpinnerProps } from './index';

export default {
  title: 'Spinner',
  component: Spinner,
};

export const Default: StoryFn<SpinnerProps> = function Default(args) {
  return <Spinner {...args} />;
};

export const WithChildren: StoryFn<SpinnerProps> = function WithChildren(args) {
  return (
    <Spinner {...args}>
      <div>Children</div>
    </Spinner>
  );
};
