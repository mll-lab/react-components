import { Story } from '@storybook/react';
import React from 'react';

import { Card, CardProps } from './index';

export default {
  title: 'Card',
};

export const Default: Story<CardProps> = (args) => (
    <Card title="Default size card" {...args}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
    </Card>
);

