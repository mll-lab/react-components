import { Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps } from 'antd';
import { format, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import React from 'react';

export const Tooltip = AntdTooltip;
export type TooltipProps = AntdTooltipProps;

export type DateWithTooltipProps = { date: Date };

/**
 * Renders a Date object into a timeAgo/fromNow/relativeDate with an attached Tooltip of the absolute time.
 * Both strings will be rendered to the german locale
 */
export function DateWithTooltip(props: DateWithTooltipProps) {
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

export type TextWithTooltipIfTrimmedProps = {
  text: string;
  maxChars: number;
};

const TRIMMED_SUFFIX = '..';
export function TextWithTooltipIfTrimmed(props: TextWithTooltipIfTrimmedProps) {
  if (props.text.length > props.maxChars) {
    return (
      <Tooltip title={props.text}>
        {props.text.substring(0, props.maxChars - TRIMMED_SUFFIX.length)}
        {TRIMMED_SUFFIX}
      </Tooltip>
    );
  }

  return <>{props.text}</>;
}
