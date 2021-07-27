import { Story } from '@storybook/react';
import React from 'react';

import { Statistic } from './index';

export default {
  title: 'Statistic',
};

export const Default: Story = (args) => (
  <Statistic title="Test" value={93} suffix="/ 100" {...args} />
);
