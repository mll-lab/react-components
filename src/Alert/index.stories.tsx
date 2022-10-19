import { Story } from '@storybook/react';
import React from 'react';

import { Alert, AlertProps } from './index';

export default {
  title: 'Alert',
  argTypes: {
    onClose: { action: 'clicked' },
    closable: {
      control: {
        type: 'boolean',
        checked: false,
      },
    },
    showIcon: {
      control: {
        type: 'boolean',
        checked: false,
      },
    },
    type: {
      control: {
        type: 'inline-radio',
        options: ['success', 'info', 'warning', 'error'],
        default: 'success',
      },
    },
  },
};

export const Default: Story<AlertProps> = function Default(args) {
  return (
    <Alert message="Warning Text" type="warning" closable showIcon {...args} />
  );
};
