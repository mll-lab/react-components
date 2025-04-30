import { Story } from '@storybook/react';
import React from 'react';

import { notification, NotificationArgs } from './index';

export default {
  title: 'notification',
  args: {
    level: 'error',
    message: 'some title',
    description: 'some description',
  },
  argTypes: {
    level: {
      options: ['info', 'success', 'warning', 'error'],
      control: {
        type: 'inline-radio',
      },
    },
  },
};

export const Default: Story<
  NotificationArgs & { level: 'info' | 'success' | 'warning' | 'error' }
> = function Default(args) {
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
