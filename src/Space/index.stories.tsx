import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Button } from '../Button/Button';
import { Card } from '../Card';

import { Space, SpaceProps } from './index';

export default {
  title: 'Space',
  argTypes: {
    direction: {
      control: {
        type: 'inline-radio',
      },
      options: ['vertical', 'horizontal'],
    },
  },
};

export const Default: StoryFn<SpaceProps> = function Default(args) {
  return (
    <Space {...args}>
      <Button>Button</Button>
      <Button>Button1</Button>
      <Button>Button2</Button>
    </Space>
  );
};

export const Block: StoryFn<SpaceProps> = function Block(args) {
  return (
    <Space vertical block>
      <Card title="Vertical space without block">
        <Space {...args} vertical>
          <Button block>Button1</Button>
          <Button block>Button2</Button>
        </Space>
      </Card>
      <Card title="Vertical space with block">
        <Space {...args} vertical block>
          <Button block>Button1</Button>
          <Button block>Button2</Button>
        </Space>
      </Card>
      <Card title="Vertical space with block and align='center'">
        <Space {...args} vertical block align="center">
          <Button block>Button1</Button>
          <Button block>Button2</Button>
        </Space>
      </Card>
      <Card title="Horizontal space without block">
        <Space {...args}>
          <Button block>Button1</Button>
          <Button block>Button2</Button>
        </Space>
      </Card>
      <Card title="Horizontal space with block (no difference because not horizontally centered)">
        <Space {...args} vertical={false} block>
          <Button block>Button1</Button>
          <Button block>Button2</Button>
        </Space>
      </Card>
    </Space>
  );
};
