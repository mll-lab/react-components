import { StoryFn } from '@storybook/react';
import React from 'react';

import { Alert, AlertProps } from './index';

export default {
  title: 'Alert',
  args: {
    closable: false,
    showIcon: false,
    type: 'success',
  },
  argTypes: {
    onClose: { action: 'clicked' },
    type: {
      control: {
        type: 'inline-radio',
      },
      options: ['success', 'info', 'warning', 'error'],
    },
  },
};

export const Default: StoryFn<AlertProps> = function Default(args) {
  return (
    <Alert message="Warning Text" type="warning" closable showIcon {...args} />
  );
};
