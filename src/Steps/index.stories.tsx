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
      },
      options: ['vertical', 'horizontal'],
    },
  },
};

export const Default: Story<StepsProps> = function Default(args) {
  return (
    <Steps current={1} {...args}>
      <Step title="Finished" description="This is a description." />
      <Step
        title="In Progress"
        subTitle="Left 00:00:08"
        description="This is a description."
      />
      <Step
        title={
          <SingleCollapse panel={{ header: 'Header' }}>
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
};
Default.argTypes = {
  current: { control: { type: 'text' } },
};
