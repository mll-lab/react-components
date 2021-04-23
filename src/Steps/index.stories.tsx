import { Story } from '@storybook/react';
import React from 'react';

import { Steps, StepsProps } from './index';

const { Step } = Steps;

export default {
  title: 'Steps',
};

export const Simple: Story<StepsProps> = (args) => (
  <Steps current={1} {...args}>
    <Step title="Finished" description="This is a description." />
    <Step
      title="In Progress"
      subTitle="Left 00:00:08"
      description="This is a description."
    />
    <Step title="Waiting" description="This is a description." />
  </Steps>
);
Simple.argTypes = {
  current: { control: { type: 'text' } },
};
