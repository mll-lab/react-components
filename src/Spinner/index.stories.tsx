import { Story } from '@storybook/react';
import React from 'react';

import { Spinner, SpinnerProps } from './index';

export default {
  title: 'Spinner',
  component: Spinner,
};

export const Default: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const WithChildren: Story<SpinnerProps> = (args) => <Spinner {...args}><div>Children</div></Spinner>;
