import { Story } from '@storybook/react';
import React from 'react';

import { notification, NotificationProps } from './index';

export default {
  title: 'notification',
  component: notification,
};

export const Default: Story<NotificationProps> = (args) => {
  function showNotification() {
    notification.warning({
      ...args,
      message: 'Notification Title',
      description: 'This is the content of the notification.',
    });
  }

  return <p onClick={showNotification}>Click Me!</p>;
};
