import { Story } from '@storybook/react';
import React from 'react';

import { Space, SpaceProps } from './index';
import {Button} from "../Button";

export default {
  title: 'Space',
    argTypes: {
        direction: {
            control: {
                type: 'inline-radio',
                options: ['vertical', 'horizontal'],
            },
        },
    },
};

export const Default: Story<SpaceProps> = (args) => (
    <Space {...args}>
        <Button>Button</Button>
        <Button>Button1</Button>
        <Button>Button2</Button>
    </Space>
);
