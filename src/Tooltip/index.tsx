import { Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps } from 'antd';
import { format, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import React from 'react';

export const Tooltip = AntdTooltip;
export type TooltipProps = AntdTooltipProps;

/**
 * Renders a Date object into a timeAgo/fromNow/relativeDate with an attached Tooltip of the absolute time.
 * Both strings will be rendered to the german locale
 */
export function DateWithToolTip(props: { date: Date }) {
  return (
    <Tooltip
      title={format(props.date, 'EEEE, dd. MMMM. yyyy HH:mm', { locale: de })}
    >
      <span>
        {formatDistanceToNow(props.date, { locale: de, addSuffix: true })}
      </span>
    </Tooltip>
  );
}
