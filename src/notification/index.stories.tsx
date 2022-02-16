import { Story } from '@storybook/react';
import React from 'react';

import { notification, NotificationArgs } from './index';

export default {
  title: 'notification',
  argTypes: {
    level: {
      control: {
        type: 'inline-radio',
        options: ['info', 'success', 'warning', 'error'],
      },
      defaultValue: 'error',
    },
    message: { control: 'string', defaultValue: 'some title' },
    description: { control: 'string', defaultValue: 'some description' },
  },
};

export const Default: Story<
  NotificationArgs & { level: 'info' | 'success' | 'warning' | 'error' }
> = (args) => {
  const { level, ...rest } = args;

  return (
    <button
      type="button"
      onClick={() => {
        notification[level](rest);
      }}
    >
      Click Me!
    </button>
  );
};
