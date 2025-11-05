import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { StoryFn } from '@storybook/react';
import React from 'react';

import { BackTop, BackTopProps } from './index';

export default {
  title: 'BackTop',
};

export const Default: StoryFn<BackTopProps> = function Default(args) {
  return (
    <div>
      <div style={{ height: '1600px' }}>
        Content height = 1600px
        <br />
        <br />
        Scroll down to see{' '}
        <VerticalAlignTopOutlined style={{ fontSize: '24px' }} /> bottom right.
      </div>
      <BackTop {...args} />
    </div>
  );
};
