import { Story } from '@storybook/react';
import React from 'react';

import { Comment, CommentProps } from './index';

export default {
  title: 'Comment',
};

export const Default: Story<CommentProps> = (args) => (
  <Comment
    author={<a>Han Solo</a>}
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    }
    avatar={<span>Avatar</span>}
    datetime={<span>1 min ago</span>}
    {...args}
  />
);
