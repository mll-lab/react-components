import { Story } from '@storybook/react';
import React from 'react';

import { DateWithToolTip, Tooltip, TooltipProps } from './index';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

export const Default: Story<TooltipProps> = (args) => (
  <Tooltip title={<div>foo</div>} {...args}>
    <p>Text</p>
  </Tooltip>
);

export const TooltipForDate: Story = (args) => (
  <DateWithToolTip date={new Date()} {...args} />
);

TooltipForDate.argTypes = {
  date: { control: { type: 'date' } },
};
