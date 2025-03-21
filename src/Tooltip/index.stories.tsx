import { Story } from '@storybook/react';
import React from 'react';

import {
  DateWithTooltip,
  DateWithTooltipProps,
  TextWithTooltipIfTrimmed,
  TextWithTooltipIfTrimmedProps,
  Tooltip,
  TooltipProps,
} from './index';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

export const Default: Story<TooltipProps> = function Default(
  args: TooltipProps,
) {
  return (
    <Tooltip title={<div>foo</div>} {...args}>
      <span>Text</span>
    </Tooltip>
  );
};

export const TooltipForDate: Story<DateWithTooltipProps> =
  function TooltipForDate(args) {
    return <DateWithTooltip {...args} />;
  };

export const TooltipForTrimmedText: Story<TextWithTooltipIfTrimmedProps> =
  function TooltipForTrimmedText(args) {
    return <TextWithTooltipIfTrimmed {...args} />;
  };

TooltipForTrimmedText.argTypes = {
  text: { control: { type: 'text' } },
  maxChars: { control: { type: 'number' } },
};
TooltipForTrimmedText.args = {
  text: 'Trimmmmmmmmmmmed',
  maxChars: 5,
};
