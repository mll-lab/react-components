import { Story } from '@storybook/react';
import React from 'react';

import { SingleCollapse } from '../Collapse';

import { Steps, StepsProps } from './index';

const { Step } = Steps;

export default {
  title: 'Steps',
  argTypes: {
    direction: {
      control: {
        type: 'inline-radio',
        options: ['vertical', 'horizontal'],
      },
    },
  },
};

export const Simple: Story<StepsProps> = (args) => (
  <Steps current={1} {...args}>
    <Step title="Finished" description="This is a description." />
    <Step
      title="In Progress"
      subTitle="Left 00:00:08"
      description="This is a description."
    />
    <Step
      title={
        <SingleCollapse panelProps={{ header: 'Header' }}>
          Content
          <br />
          Content
          <br />
          Content
          <br />
          Content
          <br />
        </SingleCollapse>
      }
    />
    <Step title="Waiting" description="This is a description." />
  </Steps>
);
Simple.argTypes = {
  current: { control: { type: 'text' } },
};
