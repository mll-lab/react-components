import {StoryFn} from '@storybook/react-webpack5';
import React from 'react';

import {Segmented, SegmentedProps} from './index';

export default {
    title: 'Segmented',
    component: Segmented,
};

export const Default: StoryFn<SegmentedProps> = function Default(args) {
    return <Segmented options={['Segment A', 'Segment B', 'Segment C']} {...args} />;
};
