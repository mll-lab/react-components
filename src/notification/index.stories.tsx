import { Story } from '@storybook/react';
import React from 'react';

import { notification, NotificationArgs } from './index';

export default {
  title: 'notification',
  argTypes: {
    level: { control: { type: 'inline-radio', options: ['warning', 'error'] } },
    message: { control: 'string' },
  },
};

export const Default: Story<NotificationArgs & { level: string }> = (args) => {
  const { message, level, ...rest } = args;

  function showNotification() {
    notification.error({
      message: message || 'notification Title',
      description: 'This is the content of the notification.',
      ...rest,
    });
  }

  return (
    <button type="button" onClick={showNotification}>
      Click Me!
    </button>
  );
};
