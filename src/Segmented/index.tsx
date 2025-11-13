import {Segmented as AntdSegmented, SegmentedProps as AntdSegmentedProps} from 'antd';
import {
    SegmentedValue as AntdSegmentedValue,
    SegmentedLabeledOption as AntdSegmentedLabeledOption
} from 'antd/es/segmented';
import * as React from 'react';

export type SegmentedValue = AntdSegmentedValue;

export type SegmentedLabeledOption = AntdSegmentedLabeledOption;

export type SegmentedProps = AntdSegmentedProps;

export const Segmented: React.ForwardRefExoticComponent<
    SegmentedProps & React.RefAttributes<HTMLElement>
> = AntdSegmented;